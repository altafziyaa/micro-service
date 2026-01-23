export const jwtConfig = {
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  accessExpiry: process.env.ACCESS_TOKEN_EXPIRY, // "15m"
  refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY, // "7d"
};
