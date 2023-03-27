import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
import { Providers } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";

let client_id: string = process.env.REACT_APP_CLIENT_ID || "";
let authority: string = process.env.REACT_APP_AUTHORITY || "";

Providers.globalProvider = new Msal2Provider({
  // replace the value in the following line with: CLIENT_ID
  clientId: client_id,
  //TODO: Get to know better: "authority" and "tenant" -> https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react
  // replace the value in the following line with: https://login.microsoftonline.com/ADD_YOUR_OWN_TENANT_ID
  authority: authority,
  scopes: [
    "APIConnectors.Read.All",
    "APIConnectors.ReadWrite.All",
    "calendars.read",
    "user.read",
    "openid",
    "profile",
    "people.read",
    "user.readbasic.all",
    "Files.Read",
    "Files.ReadWrite",
    "Files.ReadWrite.All",
  ],
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
