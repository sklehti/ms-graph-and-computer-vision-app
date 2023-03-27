import React from "react";

function ButtonThree({
  index,
  formOriginalText,
  setFormOriginalText,
  numberSum,
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
      <button
        className="button-70"
        id={index}
        style={{ marginRight: "6px" }}
        onClick={handleNumbersSum}
      >
        Laske pisteet
      </button>
    </>
  );
}

export default ButtonThree;
