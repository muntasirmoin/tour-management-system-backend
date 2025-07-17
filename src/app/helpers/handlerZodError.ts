/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.types";

export const handlerZodError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  err.issues.forEach((issue: any) => {
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
