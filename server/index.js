("use strict");

require("dotenv").config();
const express = require("express");
var cors = require("cors");
const multer = require("multer");
const app = express();
const async = require("async");
const path = require("path");
const db = require("./config/db");

app.use(cors());
app.use(express.json());

// used from Microsoft's form recognizer or computer vision
const formRecognizer = require("./ms-ocr-tools/formRegocnizer");
const {
  readTextFromFile,
  printRecText,
} = require("./ms-ocr-tools/computerVision");
const inviteFormRegocnizer = require("./ms-ocr-tools/formRecognizerKeyValuePair");

// TODO: create a unique name for the file!
const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public_form/", "uploads"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/**
 * Get all forms
 */
app.get("/api/getForms", async (req, res) => {
  const sql = "SELECT * FROM forms";

  db.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });

  try {
  } catch (err) {
    console.log(err);
  }
});

/**
 * Search the retrieved local file
 */
app.post("/api/uploadFileWithComputerVision", async (req, res) => {
  try {
    let upload = multer({
      storage: storage,
      // TODO: is this needed
      // limits: { fileSize: 1000000 },
    }).single("avatar");
    upload(req, res, async function (err) {
      if (!req.file) {
        return res.send("Valitse kuva tallennettavaksi.");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const handwrittenImageLocalPath =
        __dirname + "/public_form/uploads/" + req.file.filename;

      //---> Computer Vision
      const handwritingResult = await readTextFromFile(
        handwrittenImageLocalPath
      );
      const htmlText = await printRecText(handwritingResult);
      return res.send(htmlText);
      // <---

      // ---> Form Recognizer key value pair
      // const textResult = await inviteFormRegocnizer(handwrittenImageLocalPath);
      // return res.send(textResult);
      // <---

      //return res.send([htmlText, textResult]);

      // ---> Custom Form (From Recignizer)
      // const customText = await formRecognizer(handwrittenImageLocalPath);
      // return res.send(customText);
      // <---
    });
  } catch (err) {
    console.log(err);
  }
});

/**
 * Save the file info
 */
app.post("/api/saveFileInfo", async (req, res) => {
  try {
    let form = JSON.stringify(req.body.doc);
    const name = req.body.name;
    const operation = req.body.operation;
    const fields = req.body.fields;

    const sql =
      "INSERT INTO forms (`doc`, `name`, `operation`, `fields`) VALUES (?, ?, ?, ?)";
    const allInfo = [form, name, operation, fields];

    db.query(sql, allInfo, (err, result) => {
      if (err) throw err;

      res.send({ status: 1 });
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/updateFileInfo", (req, res) => {
  try {
    let form = JSON.stringify(req.body.doc);
    const name = req.body.name;
    const oldName = req.body.oldName;
    const operation = req.body.operation;
    const fields = req.body.fields;

    const sql =
      "UPDATE forms SET `doc`=(?), `name`=(?), `operation`=(?), `fields`=(?) WHERE `name`=(?)";

    db.query(sql, [form, name, operation, fields, oldName], (err, result) => {
      if (err) throw err;

      res.send({ status: 1 });
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete(`/api/deleteForm/:name`, (req, res) => {
  const name = req.params.name;

  try {
    const sql = "DELETE FROM forms WHERE `name`=(?)";

    db.query(sql, name, (err, result) => {
      if (err) throw err;

      res.send({ status: 1 });
    });
  } catch (err) {
    console.log(err);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
