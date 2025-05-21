import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import { WebSocketServer } from "ws";
const app = express();

app.use(cors());
const qrs = {};
const clients = {};
app.get("/", async (req, res) => {
  const qr = await QRCode.toDataURL("https://www.facebook.com/tumee.pucker");
  res.send(qr);
});

app.get("/qr", async (req, res) => {
  res.send("QR scanned");
});

const server = app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const ws = new WebSocketServer({ server });

ws.on("connection", (socket) => {
  socket.on("message", (message) => {
    const sms = JSON.parse(message);
    console.log(sms);
  });
});
