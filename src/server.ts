import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

// db_name :ph_tour_managment
// db_pass : D4o1fbOClS9tmlZW

let server: Server;

const startServer = async () => {
  try {
    // console.log(envVars.PORT);
    await mongoose.connect(
      `mongodb+srv://ph_tour_managment:D4o1fbOClS9tmlZW@cluster0.lxtvnq3.mongodb.net/tourDB?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("Connected to DB!");
    server = app.listen(envVars.PORT, () => {
      console.log(`server is listening to port: ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();

  await seedSuperAdmin();
})();

process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection detected... server shuting down..:", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("uncaught Exception detected... server shuting down..:", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Signal Received... server shuting down..:");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT Signal Received... server shuting down..:");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// unhandled Rejection error
// Promise.reject(new Error("I forget to catch this promise"));

// uncaught Exception error
// throw new Error("I forget to handle this local error");
