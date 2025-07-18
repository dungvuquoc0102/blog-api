require("module-alias/register");
require("dotenv").config();
const queueWorker = require("@/workers/queueWorker");

setInterval(async () => {
  await queueWorker();
}, 1000);
