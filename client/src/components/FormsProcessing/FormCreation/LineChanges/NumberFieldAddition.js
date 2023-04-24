import React from "react";

function NumberFieldAddition({
  line,
  index,
  setNumberInputIndex,
  formOriginalText,
  setFormOriginalText,
  setShowNumberModal,
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
  };

  const handleNumberField = (e) => {
    setNumberInputIndex(index);
    formatChanging(e.target.id, "number");
  };

  return (
    <>
      <button className="line-style" id={index} onClick={handleNumberField}>
        {line}
      </button>
    </>
  );
}

export default NumberFieldAddition;
