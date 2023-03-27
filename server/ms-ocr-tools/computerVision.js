require("dotenv").config();
const fs = require("fs");
const createReadStream = require("fs").createReadStream;
const sleep = require("util").promisify(setTimeout);

const ComputerVisionClient =
  require("@azure/cognitiveservices-computervision").ComputerVisionClient;
const ApiKeyCredentials = require("@azure/ms-rest-js").ApiKeyCredentials;

// set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
const key = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
const endpoint = process.env.COMPUTER_VISION_ENDPOINT;

const STATUS_SUCCEEDED = "succeeded";
const STATUS_FAILED = "failed";

const client = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

/**
 *
 * Perform read and await the result from local file
 *
 * @param {*} client
 * @param {*} localImagePath
 * @returns pages result
 */
async function readTextFromFile(localImagePath) {
  // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
  let result = await client.readInStream(() =>
    createReadStream(localImagePath)
  );

  // Operation ID is last path segment of operationLocation (a URL)
  let operation = result.operationLocation.split("/").slice(-1)[0];

  // Wait for read recognition to complete
  // result.status is initially undefined, since it's the result of read
  while (result.status !== STATUS_SUCCEEDED) {
    await sleep(1000);
    result = await client.getReadResult(operation);
  }

  await deleteFile(localImagePath);

  return result.analyzeResult.readResults;
}

/**
 * Prints all text from Read result
 *
 * @param {*} readResults
 */
async function printRecText(readResults) {
  console.log("Recognized text:");

  const tempArray = [];

  for (const page in readResults) {
    if (readResults.length > 1) {
      console.log(`==== Page: ${page}`);
    }
    const result = readResults[page];

    if (result.lines.length) {
      for (const line of result.lines) {
        console.log(line.words.map((w) => w.text).join(" "));

        // string array
        tempArray.push(line.text);

        // html style
        // tempArray.push({ "<>": "td", html: `${line.text} ` });
        // tempArray.push({ html: `${line.text} ` });
      }
    } else {
      console.log("No recognized text.");
    }
  }

  return tempArray;
}

async function deleteFile(localImagePath) {
  // delete file in local folder
  fs.unlink(localImagePath, (err) => {
    if (err) {
      throw err;
    }

    console.log("File deleted successfully.");
  });
}

// let computerVision = readTextFromFile(formPath).catch((error) => {
//   console.error("An error occurred:", error);
//   //process.exit(1);
// });
// let readComputerVision = printRecText(readResults);

module.exports = { readTextFromFile, printRecText };
