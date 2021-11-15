const { notif, user } = require("../../models");

const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected", socket.id);

    socket.on("load notif", async () => {
      try {
        let loadNotification = await notif.findAll({
          include: {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["userId"],
          },
        });

        loadNotification = JSON.parse(JSON.stringify(loadNotification));
        const newLoadNotification = loadNotification.map((item) => {
          const avatar = item.user.avatar
            ? process.env.PATH_AVATAR_IMAGES + item.user.avatar
            : process.env.PATH_AVATAR_IMAGES + "no-photo.jpg";

          return {
            id: item.id,
            message: item.message,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            user: {
              ...item.user,
              avatar: avatar,
            },
          };
        });

        socket.emit("all notif", newLoadNotification);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("new transaction", async () => {
      try {
        const userId = socket.handshake.query.id;

        await notif.create({
          message: "New Transaction Added",
          userId: userId,
        });

        const notification = await notif.findAll({
          include: {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          limit: 1,
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ["userId"],
          },
        });

        socket.emit("new notif", notification);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });
};

module.exports = socketIo;
