import React from "react";

function Totalpoints({
  line,
  index,
  formOriginalText,
  setFormOriginalText,
  setNumbersSum,
}) {
  const handleNumbersSum = (e) => {
    let newArray = [];

    formOriginalText.forEach((element, index) => {
      if (index === Number(e.target.id)) {
        newArray = [
          ...newArray,
          {
            row: formOriginalText[e.target.id].row,
            format: element.format === "sum" ? "" : "sum",
            value: formOriginalText[e.target.id].value,
          },
        ];
        setNumbersSum(true);
      } else {
        newArray = [...newArray, formOriginalText[index]];
      }
    });

    setFormOriginalText(newArray);
  };
  return (
    <>
      <button className="line-style" id={index} onClick={handleNumbersSum}>
        {line}
      </button>
    </>
  );
}

export default Totalpoints;
