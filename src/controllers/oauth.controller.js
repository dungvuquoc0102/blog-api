const oauthService = require("@/services/oauth.service");

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    const tokenData = await oauthService.googleLogin(credential);

    res.success(tokenData, "Đăng nhập với Google thành công");
  } catch (error) {
    let message = "Đăng nhập với Google thất bại";
    if (error.message === "DIFF_GOOGLE") {
      message =
        "Tài khoản này đã được đăng nhập bởi một phương thức khác Google";
    }
    res.error(401, message, error);
  }
};

const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenDataString = await oauthService.githubCallback(code);

    res.send(tokenDataString);
  } catch (error) {
    let message = "Đăng nhập với GitHub thất bại";
    if (error.message === "DIFF_GITHUB") {
      message =
        "Tài khoản này đã được đăng nhập bởi một phương thức khác GitHub";
    }
    res.send(`
      <script>
        window.opener.postMessage({ error: ${message} }, "*");
        window.close();
      </script>
    `);
  }
};

module.exports = {
  googleLogin,
  githubCallback,
};
