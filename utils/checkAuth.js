const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const util = require("util");

const googleclient = new OAuth2Client();
const verify = util.promisify(jwt.verify);

const checkAuth = async (token) => {
  try {
    const decoded = await verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await googleclient.verifyIdToken({
      idToken: token,
      audience: [process.env.GOOGLE_CLIENT_ID],
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return payload;
  } catch {
    return null;
  }
};

module.exports = { checkAuth, verifyGoogleToken };
