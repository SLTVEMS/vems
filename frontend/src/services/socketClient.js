import { io } from "socket.io-client";
import { env } from "../config/env.js";
import { loadSession } from "./tokenStorage.js";

export function isSocketConfigured() {
  return Boolean(env.socketUrl);
}

export function createSocket() {
  if (!isSocketConfigured()) {
    return null;
  }

  const session = loadSession();

  return io(env.socketUrl, {
    autoConnect: false,
    transports: ["websocket"],
    auth: {
      token: session?.accessToken,
      refreshToken: session?.refreshToken,
    },
  });
}
