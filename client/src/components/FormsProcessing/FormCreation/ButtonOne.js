import React from "react";

function ButtonOne({
  index,
  text,
  formOriginalText,
  setFormOriginalText,
  setFormIndex,
}) {
  const handleDeleteRow = (e) => {
    let newArray = [];

    formOriginalText.forEach((element, index) => {
      if (index !== Number(e.target.id)) {
        newArray = [...newArray, formOriginalText[index]];
      }
    });

    setFormOriginalText(newArray);
    setFormIndex(-1);
  };

  const handleUpdateText = (e) => {
    setFormIndex(e.target.value);
  };

  const handleAddRow = (e) => {
    let newArray = [];

    formOriginalText.forEach((element, index) => {
      if (index === Number(e.target.id)) {
        newArray = [...newArray, formOriginalText[index]];
        newArray = [...newArray, { row: "", format: "", value: "" }];
      } else {
        newArray = [...newArray, formOriginalText[index]];
      }
    });

    setFormOriginalText(newArray);
    setFormIndex(-1);
  };

  return (
    <>
      <button className="button-70" value={index} onClick={handleUpdateText}>
        Muuta
      </button>
      <button className="button-70" id={index} onClick={handleAddRow}>
        Lisää
      </button>
      <button
        className="button-70"
        id={index}
        value={text.row}
        onClick={handleDeleteRow}
        style={{ color: "red", marginRight: "6px" }}
      >
        poista
      </button>
    </>
  );
}

export default ButtonOne;
