const pusher = require("@/utils/socket");

const auth = async (req, res) => {
  const body = req.body;
  const socketId = body.socket_id;
  const channel = body.channel_name;

  const presenceData = {
    user_id: "some_id",
    user_info: {
      name: "John Smith",
    },
  };

  const auth = JSON.stringify(
    pusher.authorizeChannel(socketId, channel, presenceData)
  );
  const cb = callback.replace(/\\"/g, "") + "(" + auth + ");";

  res.set({
    "Content-Type": "application/javascript",
  });

  res.send(cb);
};

module.exports = { auth };
