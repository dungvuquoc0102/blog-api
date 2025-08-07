const { User } = require("@/models");
const createUsername = require("@/utils/createUsername");
const generateAuthToken = require("@/utils/generateAuthToken");
const verifyAccessGoogleToken = require("@/utils/verifyGoogleAccessToken");
const axios = require("axios");

const googleLogin = async (credential) => {
  const payload = await verifyAccessGoogleToken(credential); // Verify với Google

  let user = await User.findOne({
    where: { email: payload.email },
  });
  if (user && user.provider !== "google") {
    throw new Error("DIFF_GOOGLE");
  }
  if (!user) {
    const username = await createUsername(
      payload.given_name,
      payload.family_name
    );
    user = await User.create({
      provider: "google",
      providerId: payload.sub,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      username,
      avatar: payload.picture,
      isVerified: true,
    });
  }

  const tokenData = await generateAuthToken(user.id);

  return tokenData;
};

const githubCallback = async (code) => {
  console.log("start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", githubTokenData);
  const githubTokenData = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_REDIRECT_URI,
    },
    { headers: { Accept: "application/json" } }
  );

  console.log(
    "githubTokenData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    githubTokenData
  );
  const accessToken = githubTokenData.data.access_token;

  const { data: githubUser } = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `token ${accessToken}` },
  });
  console.log("githubUser>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", githubUser);

  const { data: emails } = await axios.get(
    "https://api.github.com/user/emails",
    {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  console.log("emails>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", emails);

  let user = await User.findOne({
    where: {
      email: emails[0].email,
    },
  });

  if (user && user.provider !== "github") {
    throw new Error("DIFF_GITHUB");
  }
  if (!user) {
    user = await User.create({
      provider: "github",
      providerId: githubUser.id,
      email: emails[0].email,
      avatar: githubUser.avatar_url,
    });
  }

  const tokenData = await generateAuthToken(user.id);

  console.log(tokenData);
  return `
    <script>
      window.opener.postMessage(
        ${JSON.stringify(tokenData)},
        "*"
      );
      window.close();
    </script>
  `;
};

module.exports = {
  googleLogin,
  githubCallback,
};
