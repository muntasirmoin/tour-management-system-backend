"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const seedSuperAdmin_1 = require("./app/utils/seedSuperAdmin");
const redis_config_1 = require("./app/config/redis.config");
// db_name :ph_tour_managment
// db_pass : D4o1fbOClS9tmlZW
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(envVars.PORT);
        yield mongoose_1.default.connect(`mongodb+srv://ph_tour_managment:D4o1fbOClS9tmlZW@cluster0.lxtvnq3.mongodb.net/tourDB?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to DB!");
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`server is listening to port: ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, redis_config_1.connectRedis)();
    yield startServer();
    yield (0, seedSuperAdmin_1.seedSuperAdmin)();
}))();
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
