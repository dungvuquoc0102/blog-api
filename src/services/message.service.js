const { Message } = require("@/models/index");
const { where, Op } = require("sequelize");

class MessagesService {
  async getAll() {
    const items = await Message.findAll();
    return items;
  }

  async getByConversationId(conversationId) {
    const items = await Message.findAll({
      where: {
        conversationId,
      },
    });
    return items;
  }

  async getById(id) {
    const message = await Message.findOne({ where: { id } });
    return message;
  }

  async create(data) {
    const message = await Message.create(data);
    return message;
  }

  async update(id, data) {
    const message = await Message.update(data, {
      where: {
        id,
      },
    });
    return message;
  }

  async remove(id) {
    const message = await Message.destroy({ where: { id } });
    return message;
  }
}

module.exports = new MessagesService();
