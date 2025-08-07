const { Queue } = require("@/models");
const sendVerifyEmail = require("@/utils/sendVerifyEmail");
const sendResetPasswordEmail = require("@/utils/sendResetPasswordEmail");

const handlers = {
  sendVerifyEmail,
  sendResetPasswordEmail,
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
      await job.update({ status: "processing" });

      const handle = handlers[job.type];
      await handle(job.payload);

      await job.update({ status: "completed" });
    } catch (error) {
      if (job.retries < PROCESS_LIMIT) {
        await job.update({ status: "pending", retries: job.retries + 1 });
      } else {
        await job.update({
          status: "rejected",
          errorMessage: error.message,
        });
        throw new Error("Thực hiện job thất bại.");
      }
    }
  }
};

module.exports = queueWorker;
