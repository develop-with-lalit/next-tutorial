import fs from "fs";
import path from "path";

const saveTo = path.join(process.cwd(), "data", "feedback");

export function readFeedbackFromFile() {
  let fileDataString = fs.readFileSync(saveTo).toString();
  fileDataString = "[" + fileDataString.slice(0, -2) + "]";
  return JSON.parse(fileDataString);
}

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  if (req.method === "GET") {
    const data = readFeedbackFromFile();
    res.status(200).json({
      message: "Success",
      data: data.find((item) => item.id === feedbackId),
    });
  } else {
    res.status(200).json({
      message: "This works",
    });
  }
}
