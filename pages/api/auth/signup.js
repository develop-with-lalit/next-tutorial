import fs from "fs";
import path from "path";

const saveTo = path.join(process.cwd(), "data", "users");

export function readUsersFromFile() {
  let fileDataString = fs.readFileSync(saveTo).toString();
  fileDataString = "[" + fileDataString.slice(0, -2) + "]";
  return JSON.parse(fileDataString);
}

export default async function RouteHandlerManager(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || email.indexOf("@") === -1 || !password) {
      res.status(422).json({ message: "Invalid data" });
      return;
    }

    fs.appendFileSync(saveTo, JSON.stringify({ email, password }) + ",\n");
    res.status(201).json({
      ok: true,
      message: "Success",
      email,
    });
  } else {
    res.status(404);
  }
}
