const oauthService = require("@/services/oauth.service");

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    const tokenData = await oauthService.googleLogin(credential);

    res.success(tokenData, "Đăng nhập với google thành công");
  } catch (error) {
    res.error(401, "Đăng nhập với google thất bại", error);
  }
};

const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenDataString = await oauthService.githubCallback(code);

    res.send(tokenDataString);
  } catch (error) {
    res.send(`
      <script>
        window.opener.postMessage({ error: "GitHub login failed" }, "*");
        window.close();
      </script>
    `);
  }
};

module.exports = {
  googleLogin,
  githubCallback,
};
