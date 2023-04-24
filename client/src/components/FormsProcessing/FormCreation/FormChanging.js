import React from "react";
import Button from "react-bootstrap/Button";
import appDatabase from "../../../services/appDatabase";

function FormChanging({
  fileName,
  setFileName,
  oldName,
  setOldName,
  setMinNumber,
  setMaxNumber,
  allForms,
  numbersSum,
  setNumbersSum,
  formOriginalText,
  setFormOriginalText,
  setShowNumberModal,
  setShowSelectModal,
}) {
  const handleFormSaving = () => {
    let trimFileName = fileName.trim();

    let sameName = allForms.map((f) => f.name).indexOf(trimFileName) > -1;

    if (trimFileName.match(/[?%+"#€&/()=*@]/g)) {
      console.log("Älä käytä erikoismerkkejä lomakkeen nimeämisessä.");
      return false;
    }

    if (trimFileName.length > 50) {
      console.log("Lomakkeen nimi on liian pitkä.");
      return false;
    }

    let operation = "";

    if (numbersSum === true) {
      operation = "sum";
    }

    // counts the number of all fields
    let fieldValue = 0;
    formOriginalText.map((r) => {
      if (r.format.length > 0 && r.format !== "sum") {
        fieldValue += 1;
      }
    });

    if (trimFileName.length > 0 && !sameName && oldName.length === 0) {
      const formInfo = {
        name: trimFileName,
        doc: formOriginalText,
        operation: operation,
        fields: fieldValue,
      };
      appDatabase.saveForm(formInfo).then((response) => {
        console.log(response);
        setFormOriginalText(null);
        setFileName("");
      });
    } else if (trimFileName.length > 0 && oldName.length > 0) {
      const formInfo = {
        oldName: oldName,
        name: trimFileName,
        doc: formOriginalText,
        operation: operation,
        fields: fieldValue,
      };

      appDatabase.updateForm(formInfo).then((response) => {
        if (response.status === 1) {
          console.log("Lomake päivitetty");

          setFormOriginalText(null);
          setFileName("");
          setOldName("");
          setMinNumber(null);
          setMaxNumber(null);
          setNumbersSum(false);
        }
      });
    } else {
      console.log(
        "Lomakkeelta puuttuu nimi tai samanniminen tiedosto löytyy jo."
      );
    }
    setShowNumberModal(false);
    setShowSelectModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleFormSaving}>
        Tallenna lomake
      </Button>
    </div>
  );
}

export default FormChanging;
