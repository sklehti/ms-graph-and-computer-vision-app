import React, { useEffect, useState } from "react";
import FormFilling from "./FormFilling";
import appDatabase from "../../services/appDatabase";

function AllForms({
  setFileName,
  setFolderInfo,
  setFormOriginalText,
  formOriginalText,
  allForms,
  setAllForms,
  setOldName,
  userPermission,
  setNumbersSum,
}) {
  const [selectedForm, setSelectedForm] = useState([]);

  useEffect(() => {
    getAllForms();
  }, [formOriginalText]);

  const getAllForms = () => {
    appDatabase.getForms().then((result) => {
      let docArray = [];

      result.map((text) => {
        docArray = [
          ...docArray,
          {
            name: text.name,
            operation: text.operation,
            doc: JSON.parse(text.doc),
            fields: text.fields,
          },
        ];
      });

      setAllForms(docArray);
    });
  };

  const handleModifyForm = (e) => {
    setFileName(allForms[e.target.value].name);
    setOldName(allForms[e.target.value].name);
    setFormOriginalText(allForms[e.target.value].doc);
    if (allForms[e.target.value].operation === "sum") {
      setNumbersSum(true);
    }
  };

  const handleDeleteForm = (e) => {
    appDatabase.deleteForm(allForms[e.target.value].name).then((response) => {
      console.log(response);
      getAllForms();
    });
  };

  const handleForm = (e) => {
    setSelectedForm(
      allForms[e.target.value].name === selectedForm.name
        ? []
        : allForms[e.target.value].name !== selectedForm.name
        ? allForms[e.target.value]
        : []
    );
  };

  return (
    <div>
      {allForms.length > 0 ? <h2 id="all-forms">Lomakkeet</h2> : <></>}

      <br />
      {allForms.map((n, index) => (
        <div key={index} className="form-row-style">
          {userPermission ? (
            <>
              <a href="#form-creation">
                <button
                  href="form-creation"
                  value={index}
                  className="button-7"
                  onClick={handleModifyForm}
                >
                  Muokkaa
                </button>
              </a>
              <button
                value={index}
                className="button-8"
                onClick={handleDeleteForm}
              >
                Poista
              </button>
            </>
          ) : (
            <></>
          )}

          <button value={index} onClick={handleForm} className="button-59">
            {n.name}
          </button>
        </div>
      ))}
      <br />
      <FormFilling
        selectedForm={selectedForm}
        setFolderInfo={setFolderInfo}
        setSelectedForm={setSelectedForm}
      />
    </div>
  );
}

export default AllForms;
