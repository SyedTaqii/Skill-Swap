module.exports = {
    jwtSecret: process.env.JWT_SECRET || "fallbacksecret",
    saltRounds: 10,
};
