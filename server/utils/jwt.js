var jwt = require("jsonwebtoken");

// user (exp - optional expiery time)
const generateUserToken = async (payload,exp) => {
  try {
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET_USER, {
      expiresIn: exp?exp:"1d",
    });
    return token;
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

//admin (exp - optional expiery time)
const generateAdminToken = async (payload,exp) => {
  try {
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET_ADMIN, {
      expiresIn: exp?exp:"1d",
    });
    return token;
  } catch (error) {
    throw new Error("Failed to generate token");
  }
};

module.exports = { generateUserToken, generateAdminToken };
