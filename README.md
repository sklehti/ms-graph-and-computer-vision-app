# ms-graph-and-computer-vision-app

# To run locally

### Deploy Microsoft Graph Toolkit

- Set up your Microsoft 365 tenant: https://learn.microsoft.com/en-us/graph/toolkit/get-started/overview?tabs=html (Note! Select "Instant sandbox")
- Create an Azure Active Directory app, instructions at the following link: https://learn.microsoft.com/en-us/graph/toolkit/get-started/add-aad-app-registration (Note! Use the account created above)
- In the Azure Portal, go to your application registration.
  Verify that you are on the Overview page.
  From the Essentials section, copy the values of the Application (client) ID and Directory (tenant) ID properties
- Create an .env file at the root of the client folder and add the IDs to that file as follows:

```
REACT_APP_CLIENT_ID=ADD_YOUR_OWN_CLIENT_ID
REACT_APP_AUTHORITY=https://login.microsoftonline.com/ADD_YOUR_OWN_TENANT_ID
```

### Deploy Computer Vision

- Create an Azure subscription: https://azure.microsoft.com/en-gb/free/cognitive-services/
- After that create a Computer Vision Resource. More info at the following link: https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/client-library?tabs=visual-studio&pivots=programming-language-javascript
- You will need the key and endpoint from the resource you create to connect your application to the Computer Vision service.
- Create an .env file at the root of the server folder and add the IDs to that file as follows:

```
COMPUTER_VISION_SUBSCRIPTION_KEY=ADD_YOUR_OWN_KEY
COMPUTER_VISION_ENDPOINT=ADD_YOUR_OWN_ENDPOINT
```

### Deploy MySQL database:

- Follow the instructions in the mysql_instructions.txt file

### Start the app

- `cd server`
- `npm i`
- `node index.js`

- `cd client`
- `npm i`
- `npm start`
- Open the app on http://localhost:3000/
