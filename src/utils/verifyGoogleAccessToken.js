const axios = require("axios");

async function verifyGoogleToken(accessToken) {
  const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const payload = res.data;
  return payload; // chứa email, name, picture, sub (googleId)
}

module.exports = verifyGoogleToken;
