var jwt = require("jsonwebtoken");

// user
const generateUserToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET_USER, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

//admin
const generateAdminToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET_ADMIN, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

module.exports = { generateUserToken, generateAdminToken };
