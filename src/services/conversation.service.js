const { Conversation, User, Message } = require("@/models/index");
const { where, Op } = require("sequelize");
const { sequelize } = require("@/models");

class ConversationsService {
  async getAll(userId) {
    const conversations = await Conversation.findAll({
      where: {
        id: sequelize.literal(`(
          SELECT conversation_id
          FROM conversation_users
          WHERE user_id = ${userId}
        )`),
      },
      include: [
        {
          model: User,
          as: "participants",
          through: { attributes: [] },
          attributes: ["id", "username", "avatar"],
        },
        {
          model: Message,
          as: "messages",
          limit: 1,
          order: [["created_at", "DESC"]],
        },
      ],
      order: [["lastMessagedAt", "DESC"]],
    });

    // Format lại từng conversation
    const formatted = conversations.map((conv) => {
      const other = conv.participants.find((u) => u.id !== userId);
      const last = conv.messages?.[0];

      return {
        id: conv.id,
        participant: other || null,
        lastMessage: last
          ? {
              content: last.content,
              timestamp: last.created_at,
              senderId: last.sender_id,
            }
          : null,
        participants: conv.participants,
        name: conv.name,
      };
    });

    return formatted;
  }

  async getById(id) {
    const conversation = await Conversation.findOne({
      where: { id },
    });
    return conversation;
  }

  async create(data) {
    const conversation = await Conversation.create(data);
    return conversation;
  }

  async update(id, data) {
    const conversation = await Conversation.update(data, {
      where: {
        id,
      },
    });
    return conversation;
  }

  async remove(id) {
    const conversation = await Conversation.destroy({ where: { id } });
    return conversation;
  }
}

module.exports = new ConversationsService();
