require("module-alias/register");
require("dotenv").config();
const queueWorker = require("@/workers/queueWorker");

setInterval(async () => {
  await queueWorker();
}, 1000);

const greenColor = "\x1b[32m";
console.log(greenColor + "Queue is running..." + greenColor);
