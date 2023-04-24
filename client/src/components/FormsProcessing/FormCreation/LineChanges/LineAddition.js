import React from "react";

function LineAddition({
  line,
  index,
  formOriginalText,
  setFormOriginalText,
  setFormIndex,
}) {
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
      <button className="line-style" id={index} onClick={handleAddRow}>
        {line}
      </button>
    </>
  );
}

export default LineAddition;
