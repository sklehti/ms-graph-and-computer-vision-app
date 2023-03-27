require("dotenv").config();
const fs = require("fs");

/*
  This code sample shows Custom Model operations with the Azure Form Recognizer client library. 

  To learn more, please visit the documentation - Quickstart: Form Recognizer Javascript client library SDKs
  https://docs.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/quickstarts/try-v3-javascript-sdk
*/

const {
  AzureKeyCredential,
  DocumentAnalysisClient,
} = require("@azure/ai-form-recognizer");

const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT || "<endpoint>";
const credential = new AzureKeyCredential(
  process.env.FORM_RECOGNIZER_KEY || "<api key>"
);

/*
 * This sample shows how to analyze a document using a model with a given ID. The model ID may refer to any model,
 * whether custom, prebuilt, composed, etc.
 *
 * @summary analyze a document using a model by ID
 */
async function formRegocnizer(fileName) {
  const client = new DocumentAnalysisClient(endpoint, credential);

  const modelId =
    process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID || "<custom model ID>";

  const readStream = fs.createReadStream(fileName);
  const poller = await client.beginAnalyzeDocument(modelId, readStream);

  const {
    documents: [document],
  } = await poller.pollUntilDone();

  if (!document) {
    throw new Error("Expected at least one document in the result.");
  }

  console.log(
    "Extracted document:",
    document.docType,
    `(confidence: ${document.confidence || "<undefined>"})`
  );
  console.log("Fields:", document.fields);
  return document.fields;

  // TEST: tested form name lomake_1
  for (let r of document.fields.table_4.values) {
    console.log("testi:", r);
  }
}

// let formReader = formRegocnizer().catch((error) => {
//   console.error("An error occurred:", error);
//   process.exit(1);
// });

module.exports = formRegocnizer;
