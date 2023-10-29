var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
// var config= require("./config/db.json");

dotenv.config();

const connectDb = require("./config/dbConfig");
const userRouter = require("./routes/userRouter");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require("./routes/messageRoutes");

const app = express();

app.use(express.json());

connectDb();

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

const server = app.listen(process.env.PORT, () => {
  console.log("app is listening on port :", process.env.PORT);
});

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (user) => {
    // console.log("user", user);
    socket.join(user?._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room :", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
// mongoose.connect(process.env.DB_CONNECTION_URL).then(()=>{
//     console.log("Connected to Mongo DB");
// })
