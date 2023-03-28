import React, { useState, useEffect } from "react";
import { PeoplePicker } from "@microsoft/mgt-react";
import Button from "react-bootstrap/Button";
import { Providers } from "@microsoft/mgt-element";
import { prepScopes } from "@microsoft/mgt-element";

function FormSaving({ setFolderInfo, selectedForm, setSelectedForm }) {
  const [peopleEmails, setPeopleEmails] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const peoplePicker = document.querySelector("mgt-people-picker");

  useEffect(() => {
    getUserInfo();
  }, []);

  /**
   * Functio get user informations
   */
  const getUserInfo = async () => {
    let provider = Providers.globalProvider;
    if (provider) {
      let graphClient = provider.graph.client;
      let userDetails = await graphClient.api("/me").get();
      setUserInfo(userDetails);

      const children = await graphClient.api("/me/drive/root/children").get();
      let rightFolder = children.value.filter((file) => file.name === "okyky");

      if (rightFolder.length > 0) {
        setFolderInfo(rightFolder[0].webUrl);
      }
    }
  };

  /**
   * Search and display selected users
   * @param {users} e
   */
  const handlePeople = (e) => {
    peoplePicker.selectedPeople.map((p) => {
      if (p.userPrincipalName !== undefined && p.userPrincipalName !== null) {
        setPeopleEmails([...peopleEmails, { email: p.userPrincipalName }]);
      } else if (p.displayName !== undefined && p.displayName !== null) {
        setPeopleEmails([...peopleEmails, { email: p.displayName }]);
      }
    });
  };

  const permission = {
    recipients: peopleEmails,
    message: "Here's the file that we're collaborating on.",
    requireSignIn: true,
    sendInvitation: true,
    roles: ["write"],
    // TODO: add password
    //password: "password123",
    // TODO: remove hardcoding
    expirationDateTime: "2024-07-15T14:00:00.000Z",
  };

  /**
   * Creates a new folder and a file with text inside it.
   * In addition, share the selected folder with the desired users
   * and  send the share link.
   */
  // TODO: Add error handling
  async function handleForm(e) {
    let sum = 0;
    let sumText = "Lomake: " + selectedForm.name + "\n";
    let fullText = "";
    let valuesSum = 0;

    // Adds up numeric values
    if (selectedForm.operation === "sum") {
      selectedForm.doc.map((n, index) => {
        if (n.format === "number") {
          if (n.value.length < 1) {
            // TODO: Use e.g. the boostrap or formik form and their error handling!
            console.log("Täytä kaikki kentät!");
          }

          sum += Number(n.value);
        }
        if (n.format === "sum") {
          sumText += n.row + " " + sum + "\n";
          fullText = fullText + n.row + " " + sum + "\n";
        } else {
          fullText = fullText + n.row + " " + n.value + "\n";
          if (
            (n.value.length > 0 && !Array.isArray(n.value)) ||
            (n.value.length === 1 && Array.isArray(n.value))
            // n.value.length > 0
          ) {
            valuesSum += 1;
          }
        }
      });
    } else {
      selectedForm.doc.map((t) => {
        fullText = fullText + t.row + " " + t.value + "\n";
        if (
          (t.value.length > 0 && !Array.isArray(t.value)) ||
          (t.value.length === 1 && Array.isArray(t.value))
          // t.value.length > 0
        ) {
          valuesSum += 1;
        }
      });
    }

    console.log(valuesSum, " and ", selectedForm.fields);

    if (Number(valuesSum) === Number(selectedForm.fields)) {
      let provider = Providers.globalProvider;
      if (provider) {
        let graphClient = provider.graph.client;

        let user = userInfo.userPrincipalName.split("@")[0];

        // Check if okyky-folder already exists
        let okykyFolder = await graphClient
          .api(`/me/drive/root/search(q='okyky')?select=name`)
          .get();

        let updateSummaryForm = "";

        if (okykyFolder.value.length > 0) {
          // Check if tilasto.txt file already exists
          let summaryFile = await graphClient
            .api(`/me/drive/root:/okyky:/search(q='tilasto.txt')?select=name`)
            .get();

          // if tilasto.txt file is found, retrieve its contents

          if (summaryFile.value.length > 0) {
            updateSummaryForm = await graphClient
              // .api(`/me/drive/special/approot/children/tilasto.txt/content`)
              .api(`/me/drive/root:/okyky/tilasto.txt:/content`)
              .get();
          }
        }

        let fullSummaryText = updateSummaryForm + "\n" + sumText;

        // Update summary file
        let summaryForm = await graphClient
          // .api(`me/drive/special/approot/children/tilasto.txt/content`)
          .api(`/me/drive/root:/okyky/tilasto.txt:/content`)
          .middlewareOptions(
            prepScopes("APIConnectors.Read.All", "APIConnectors.ReadWrite.All")
          )
          .put(fullSummaryText);

        //retrieves the details of the persons to whom the file has been shared
        let permissions = await graphClient
          .api(`/me/drive/items/${summaryForm.id}/permissions`)
          .get();

        // retrieve the id of the persons to whom the file has been shared
        let persons = [];
        permissions.value.map((p) => {
          persons = [...persons, p.id];
        });

        // Delete permission from all users
        persons.map(async (p) => {
          await graphClient
            .api(`/me/drive/items/${summaryForm.id}/permissions/${p}`)
            .delete();
        });

        // Share the file with selected people
        if (peopleEmails.length > 0) {
          await graphClient
            .api(`/me/drive/items/${summaryForm.id}/invite`)
            .post(permission);
        }

        // If (full text) file with the same name isn't found, the file is saved
        // if (searchFile.value.length === 0 && userInfo !== null) {
        if (userInfo !== null) {
          let children = await graphClient
            .api(
              `/me/drive/root:/okyky/${selectedForm.name}_${user}.txt:/content`
            )
            .middlewareOptions(
              prepScopes(
                "APIConnectors.Read.All",
                "APIConnectors.ReadWrite.All"
              )
            )
            .put(fullText);

          setPeopleEmails([]);
          setSelectedForm([]);

          const children_2 = await graphClient
            .api("/me/drive/root/children")
            .get();
          let rightFolder = children_2.value.filter(
            (file) => file.name === "okyky"
          );

          if (rightFolder.length > 0) {
            setFolderInfo(rightFolder[0].webUrl);
          }

          console.log("Tiedosto on luotu ja täytetty.");
          getUserInfo();
        } else {
          console.log(
            "Olet jo täyttänyt kyseisen lomakeen. Et voi täyttää sitä uudestaan."
          );
        }
      }
    } else {
      console.log("Täytä kaikki kentät!");
    }
  }

  return (
    <div>
      <h4>Valitse henkilöt, joille haluat jakaa tiedoston</h4>
      <div style={{ paddingLeft: "20%", paddingRight: "20%" }}>
        <PeoplePicker
          allowAnyEmail
          className="custom-class"
          placeholder="Kirjoita sähköpostiosoite"
          selectionChanged={handlePeople}
        />
      </div>
      <br />
      <Button variant="primary" onClick={handleForm}>
        Talleta ja jaa tiedosto
      </Button>
    </div>
  );
}

export default FormSaving;
