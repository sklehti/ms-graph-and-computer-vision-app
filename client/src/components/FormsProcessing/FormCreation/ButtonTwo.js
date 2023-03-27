import React from "react";

function ButtonTwo({
  index,
  formOriginalText,
  setFormOriginalText,
  setShowNumberModal,
  setShowSelectModal,
  setNumberInputIndex,
}) {
  const formatChanging = (id, newFormat) => {
    let newArray = [];

    formOriginalText.forEach((element, index) => {
      if (index === Number(id)) {
        newArray = [
          ...newArray,
          {
            row: formOriginalText[id].row,
            format: element.format === newFormat ? "" : newFormat,
            value:
              element.format === newFormat ? formOriginalText[id].value : "",
          },
        ];
      } else {
        newArray = [...newArray, formOriginalText[index]];
      }
    });
    setFormOriginalText(newArray);

    if (newArray[id].format === "number") {
      setShowNumberModal(true);
    }

    if (newArray[id].format === "select") {
      setShowSelectModal(true);
    }
  };

  const handleInputField = (e) => {
    formatChanging(e.target.id, "input");
  };

  const handleNumberField = (e) => {
    setNumberInputIndex(index);
    formatChanging(e.target.id, "number");
  };

  const handleCheckboxField = (e) => {
    let newArray = [];

    formOriginalText.forEach((element, index) => {
      if (index === Number(e.target.id)) {
        newArray = [
          ...newArray,
          {
            row: formOriginalText[e.target.id].row,
            format: element.format === "checkbox" ? "" : "checkbox",
            value: element.format === "checkbox" ? "" : "☐",
          },
        ];
      } else {
        newArray = [...newArray, formOriginalText[index]];
      }
    });
    setFormOriginalText(newArray);
  };

  // TODO: Remove values from value if the select field is cleared.
  // Same for numeric fields
  const handleSelectField = (e) => {
    setNumberInputIndex(index);
    formatChanging(e.target.id, "select");
  };

  return (
    <>
      <button className="button-70" id={index} onClick={handleInputField}>
        Teksti
      </button>
      <button className="button-70" id={index} onClick={handleNumberField}>
        Numero
      </button>
      <button className="button-70" id={index} onClick={handleCheckboxField}>
        Ruutu
      </button>
      <button
        className="button-70"
        style={{ marginRight: "6px" }}
        id={index}
        onClick={handleSelectField}
      >
        Valinta
      </button>
    </>
  );
}

export default ButtonTwo;
