import openSocket from "socket.io-client";

// We want the same socket for all handlers
export const socket = openSocket('/conn');