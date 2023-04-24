import React from "react";

function InputfieldAddition({
  line,
  index,
  formOriginalText,
  setFormOriginalText,
}) {
  //TODO: this function is almost identical between the text field, the number field and the select field
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
  };

  const handleInputField = (e) => {
    formatChanging(e.target.id, "input");
  };

  return (
    <>
      <button className="line-style" id={index} onClick={handleInputField}>
        {line}
      </button>
    </>
  );
}

export default InputfieldAddition;
