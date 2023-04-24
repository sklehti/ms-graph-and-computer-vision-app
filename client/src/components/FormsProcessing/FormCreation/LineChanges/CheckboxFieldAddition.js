import React from "react";

function CheckboxFieldAddition({
  line,
  index,
  formOriginalText,
  setFormOriginalText,
}) {
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

  return (
    <>
      <button className="line-style" id={index} onClick={handleCheckboxField}>
        {line}
      </button>
    </>
  );
}

export default CheckboxFieldAddition;
