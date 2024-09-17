import * as fs from "fs";
import { now } from "mongoose";
class LoggingService {
  /**  Log Warnings messages */
  public static warnings(content: string) {
    console.log(content);
    content = content + now() + "\n";
    fs.appendFile("./src/Services/Logger/warnings.log", content, (err) => {
      if (err) {
        console.log("ERROR IN WRITING WARNING ", new Error(err.message));
      }
    });
  }

  /**  Log Exceptions messages */
  public static exceptions(error: Error) {
    console.log(error);
    let content = error.message + now() + "\n";
    fs.appendFile("./src/Services/Logger/exceptions.log", content, (err) => {
      if (err) {
        console.log("ERROR IN WRITING EXCEPTION ", new Error(err.message));
      }
    });
  }

  /** Log Critical Errors */
  public static critical(content: string) {
    console.log(content);
    content = content + now() + "\n";
    fs.appendFile("./src/Services/Logger/critical.log", content, (err) => {
      if (err) {
        console.log("ERROR IN WRITING CRITICAL ", new Error(err.message));
      }
    });
  }
}

export default LoggingService;
