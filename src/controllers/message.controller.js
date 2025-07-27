const messagesService = require("@/services/message.service");
const pusher = require("@/utils/socket");
const { Conversation, User, Message } = require("@/models");
const { sequelize } = require("@/models");

const index = async (req, res) => {
  try {
    const { conversationId } = req.params;
    let messages;
    if (conversationId) {
      messages = await messagesService.getByConversationId(conversationId);
    } else {
      messages = await messagesService.getAll();
    }
    res.success(messages, "Lấy danh sách tin nhắn thành công");
  } catch (error) {
    res.error(500, "Lỗi khi lấy danh sách tin nhắn", error.message);
  }
};

const show = async (req, res) => {
  const comment = await messagesService.getById(req.params.id);

  if (!comment) throwError(404, "Not Found.");

  response.success(res, 200, comment);
};

const store = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const senderId = req.user.id;
    const { conversationId, receiverId, content } = req.body;

    if (!content?.trim()) {
      await t.rollback();
      return response.error(res, 400, "Nội dung tin nhắn không hợp lệ");
    }

    let resolvedConversationId = conversationId;

    // Nếu chưa có conversation → tìm hoặc tạo
    if (!conversationId) {
      if (!receiverId || receiverId === senderId) {
        await t.rollback();
        return response.error(res, 400, "Người nhận không hợp lệ");
      }

      const [existing] = await sequelize.query(
        `
        SELECT c.id FROM conversations c
        JOIN conversation_user cu1 ON cu1.conversation_id = c.id AND cu1.user_id = :user1
        JOIN conversation_user cu2 ON cu2.conversation_id = c.id AND cu2.user_id = :user2
        WHERE c.deleted_at IS NULL
        LIMIT 1
        `,
        {
          replacements: { user1: senderId, user2: receiverId },
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
        }
      );

      if (existing) {
        resolvedConversationId = existing.id;
      } else {
        const newConv = await Conversation.create({}, { transaction: t });
        await ConversationUser.bulkCreate(
          [
            { user_id: senderId, conversation_id: newConv.id },
            { user_id: receiverId, conversation_id: newConv.id },
          ],
          { transaction: t }
        );
        resolvedConversationId = newConv.id;
      }
    } else {
      const conversation = await Conversation.findOne({
        where: { id: conversationId },
        include: [
          {
            model: User,
            as: "participants",
            where: { id: senderId },
            attributes: [],
            through: { attributes: [] },
          },
        ],
      });

      if (!conversation) {
        await t.rollback();
        return response.error(res, 403, "Bạn không thuộc cuộc trò chuyện này");
      }
    }

    // Tạo message
    const newMessage = await Message.create(
      {
        conversationId: resolvedConversationId,
        userId: senderId,
        content: content.trim(),
      },
      { transaction: t }
    );

    // Cập nhật thời gian gửi gần nhất
    await Conversation.update(
      { lastMessagedAt: new Date() },
      { where: { id: resolvedConversationId }, transaction: t }
    );

    await t.commit();

    // Gửi message qua pusher
    const payload = newMessage;

    await pusher.trigger(
      `chat-${resolvedConversationId}`,
      "new-message",
      payload
    );

    res.success(newMessage, "Gửi tin nhắn thành công");
  } catch (err) {
    await t.rollback();
    res.error(500, "Lỗi gửi message", err.message);
  }
};

const update = async (req, res) => {
  const comment = await messagesService.update(req.params.id, req.body);

  if (!comment) throwError(404, "Not Found.");

  response.success(res, 201, comment);
};

const destroy = async (req, res) => {
  const result = await messagesService.remove(req.params.id);

  if (!result) throwError(404, "Not Found.");

  response.success(res, 204);
};

module.exports = { show, index, store, update, destroy };
