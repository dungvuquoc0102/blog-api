const { Queue } = require("@/models");
const sendVerifyEmail = require("@/utils/sendVerifyEmail");

const handlers = {
  sendVerifyEmail,
};
const PROCESS_LIMIT = 5;

const queueWorker = async () => {
  const jobs = await Queue.findAll({
    where: {
      status: "pending",
    },
    order: [["created_at", "ASC"]],
    limit: PROCESS_LIMIT,
  });

  for (const job of jobs) {
    try {
      // Đánh dấu đang xử lý
      await job.update({ status: "processing" });

      // Xử lý từng loại job
      const handle = handlers[job.type];
      await handle(job.payload);

      // Cập nhật hoàn tất
      await job.update({ status: "completed" });
    } catch (err) {
      console.error("Lỗi trong queueWorker:", err.message);
      await job.update({
        status: "rejected",
        errorMessage: err.message,
      });
      throw new Error("Thực hiện job thất bại.");
    }
  }
};

module.exports = queueWorker;
