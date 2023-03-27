const fs = require("fs");
require("dotenv").config();

const {
  AzureKeyCredential,
  DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");

const key = process.env.FORM_RECOGNIZER_KEY;
const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT;

async function inviteFormRegocnizer(handwrittenImageLocalPath) {
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(key)
  );

  const fileName = handwrittenImageLocalPath;
  // "./public_form/uploads/application_daba45d6-dc4f-4ad1-a6e1-b3a476e9c9d3.pdf";

  if (!fs.existsSync(fileName)) {
    throw new Error(`Expected file "${fileName}" to exist.`);
  }

  const readStream = fs.createReadStream(fileName);

  const poller = await client.beginAnalyzeDocumentFromUrl(
    "prebuilt-document",
    readStream,
    {
      onProgress: (state) => {
        console.log(`status: ${state.status}`);
      },
    }
  );

  const { keyValuePairs } = await poller.pollUntilDone();
  const tempArray = [];

  if (!keyValuePairs || keyValuePairs.length <= 0) {
    console.log("No key-value pairs were extracted from the document.");
  } else {
    console.log("Key-Value Pairs:");
    for (const { key, value, confidence } of keyValuePairs) {
      console.log("- Key  :", `"${key.content}"`);
      console.log(
        "  Value:",
        `"${(value && value.content) || "<undefined>"}" (${confidence})`
      );

      tempArray.push({
        key: key.content,
        value: `${(value && value.content) || "<undefined>"}`,
      });
    }

    return tempArray;
  }
}

// main().catch((error) => {
//   console.error("An error occurred:", error);
//   process.exit(1);
// });

module.exports = inviteFormRegocnizer;
