import React, { useEffect, useState } from "react";
import FileUploader from "./FormsProcessing/FileUploader";
import FormCreation from "./FormsProcessing/FormCreation/FormCreation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowUp from "../icons/ArrowUp";
import Footer from "./Footer";
import AllForms from "./FormsProcessing/AllForms";
import PersonFiles from "./PersonFiles";
import { Providers } from "@microsoft/mgt-element";

function PageView({ userPermission }) {
  const [formOriginalText, setFormOriginalText] = useState(null);
  const [folderInfo, setFolderInfo] = useState({});
  const [allForms, setAllForms] = useState([]);
  const [fileName, setFileName] = useState("");
  const [oldName, setOldName] = useState("");
  const [numbersSum, setNumbersSum] = useState(false);

  useEffect(() => {
    folderExist();
  }, []);

  const folderExist = async () => {
    let provider = Providers.globalProvider;
    if (provider) {
      let graphClient = provider.graph.client;

      const children = await graphClient.api("/me/drive/root/children").get();
      let rightFolder = children.value.filter((file) => file.name === "okyky");

      if (rightFolder.length > 0) {
        setFolderInfo(rightFolder[0].webUrl);
      }
    }
  };

  return (
    <div>
      <Container className="main-container-style">
        <a
          href="#top"
          className="arrow-style"
          title="Siirry sivun alkuun"
          alt="Painamalla painiketta siirryt sivun alkuun"
        >
          <ArrowUp />
        </a>
        <Row>
          <Col>
            {userPermission ? (
              <FileUploader
                setFormOriginalText={setFormOriginalText}
                formOriginalText={formOriginalText}
                oldName={oldName}
              />
            ) : (
              <></>
            )}

            <FormCreation
              setFileName={setFileName}
              fileName={fileName}
              formOriginalText={formOriginalText}
              setFormOriginalText={setFormOriginalText}
              setFolderInfo={setFolderInfo}
              allForms={allForms}
              setOldName={setOldName}
              oldName={oldName}
              numbersSum={numbersSum}
              setNumbersSum={setNumbersSum}
            />

            <AllForms
              setFileName={setFileName}
              setFormOriginalText={setFormOriginalText}
              formOriginalText={formOriginalText}
              setFolderInfo={setFolderInfo}
              allForms={allForms}
              setAllForms={setAllForms}
              setOldName={setOldName}
              userPermission={userPermission}
              setNumbersSum={setNumbersSum}
            />
            <PersonFiles folderInfo={folderInfo} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PageView;
