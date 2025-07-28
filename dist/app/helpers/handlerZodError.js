"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerZodError = void 0;
const handlerZodError = (err) => {
    const errorSources = [];
    err.issues.forEach((issue) => {
        errorSources.push({
            //path : "nickname iside lastname inside name"
            // path: issue.path.length > 1 && issue.path.reverse().join(" inside "),
            //   const path =
            //   issue.path.length > 1
            //     ? issue.path.slice().reverse().join(" inside ")
            //     : issue.path[0];
            // errorSources.push({
            //   path,
            //   message: issue.message,
            // });
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        });
    });
    return {
        statusCode: 400,
        message: "Zod Error",
        errorSources,
    };
};
exports.handlerZodError = handlerZodError;
