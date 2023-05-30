import fs from "fs";
import path from "path";

const saveTo = path.join(process.cwd(), "data", "feedback");

export function readFeedbackFromFile() {
  let fileDataString = fs.readFileSync(saveTo).toString();
  fileDataString = "[" + fileDataString.slice(0, -2) + "]";
  return JSON.parse(fileDataString);
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, text } = req.body;
    const newFeedbackString = JSON.stringify({
      id: new Date().toISOString(),
      email,
      text,
    });
    fs.appendFileSync(saveTo, newFeedbackString + ",\n");
    res.status(201).json({
      message: "Success",
      feedback: JSON.parse(newFeedbackString),
    });
  } else if (req.method === "GET") {
    const data = readFeedbackFromFile();
    res.status(200).json({
      message: "Success",
      data,
    });
  } else {
    res.status(200).json({
      message: "This works",
    });
  }
}
