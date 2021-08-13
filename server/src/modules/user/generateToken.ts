import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
  return jwt.sign({ userId: id }, "myawesomesecret", { expiresIn: "15m" });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ userId: id }, "myawesomesecretadkjsahdjk", {
    expiresIn: "7d",
  });
};
