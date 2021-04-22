import express from "express";
import { createServer } from "http";
import path from "path";
import { Server, Socket } from "socket.io";
import "./database";
import { routes } from "./routes";

const app = express();

// Set access to public files
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get("/pages/client", (req, res) => {
  return res.render("html/client.html");
});

const http = createServer(app); // Create http protocol
const io = new Server(http); //  Create websocket protocol

io.on("connection", (socket: Socket) => {
  console.log("Connected", socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };
