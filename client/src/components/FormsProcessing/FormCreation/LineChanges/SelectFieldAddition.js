import React from "react";

function SelectFieldAddition({
  line,
  index,
  setNumberInputIndex,
  formOriginalText,
  setFormOriginalText,
  setShowSelectModal,
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

    if (newArray[id].format === "select") {
      setShowSelectModal(true);
    }
  };

  const handleSelectField = (e) => {
    setNumberInputIndex(index);
    formatChanging(e.target.id, "select");
  };

  return (
    <>
      <button className="line-style" id={index} onClick={handleSelectField}>
        {line}
      </button>
    </>
  );
}

export default SelectFieldAddition;
