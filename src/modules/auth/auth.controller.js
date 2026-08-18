import { clearRefreshCookie, setRefreshCookie } from "../../utils/jwt.js";
import * as authService from "./auth.service.js";

const register = async (req, res, next) => {
  const user = await authService.register({ data: req.body });
  res.json({
    success: true,
    ...user,
  });
};

const login = async (req, res, next) => {
  const { refreshToken, ...response } = await authService.login({
    data: req.body,
  });
  setRefreshCookie(res, refreshToken);

  res.json({
    success: true,
    data: response,
  });
};

const logout = async (req, res) => {
  await authService.logout({ sessionId: req.auth.sessionId });
  clearRefreshCookie(res);
  res.status(204).end();
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const { refreshToken: newRefreshToken, ...response } =
    await authService.refreshToken({ refreshToken });

  setRefreshCookie(res, newRefreshToken);
  res.json({
    success: true,
    data: response,
  });
};

export { register, login, logout, refreshToken };
