import React from "react";

function FieldAddition({
  fieldType,
  line,
  index,
  formOriginalText,
  setFormOriginalText,
  setFormIndex,
  formIndex,
  setNumberInputIndex,
  setShowNumberModal,
  setShowSelectModal,
  setNumbersSum,
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

  const handleFieldClick = (e) => {
    let newArray_2 = [];

    switch (fieldType) {
      case "Rivi":
        formOriginalText.forEach((element, index) => {
          if (index === Number(e.target.id)) {
            newArray_2 = [...newArray_2, formOriginalText[index]];
            newArray_2 = [...newArray_2, { row: "", format: "", value: "" }];
          } else {
            newArray_2 = [...newArray_2, formOriginalText[index]];
          }
        });

        setFormOriginalText(newArray_2);
        setFormIndex(-1);
        break;

      case "Tekstikenttä":
        formatChanging(e.target.id, "input");
        break;

      case "Numerokenttä":
        console.log("tullaanhan tänne?");
        setNumberInputIndex(index);
        formatChanging(e.target.id, "number");
        break;

      case "Ruutukenttä":
        formOriginalText.forEach((element, index) => {
          if (index === Number(e.target.id)) {
            newArray_2 = [
              ...newArray_2,
              {
                row: formOriginalText[e.target.id].row,
                format: element.format === "checkbox" ? "" : "checkbox",
                value: element.format === "checkbox" ? "" : "☐",
              },
            ];
          } else {
            newArray_2 = [...newArray_2, formOriginalText[index]];
          }
        });
        setFormOriginalText(newArray_2);
        break;

      case "Valikkokenttä":
        setNumberInputIndex(index);
        formatChanging(e.target.id, "select");
        break;

      case "Pisteet":
        // this could work with exactly the same function as above, test
        formOriginalText.forEach((element, index) => {
          if (index === Number(e.target.id)) {
            newArray_2 = [
              ...newArray_2,
              {
                row: formOriginalText[e.target.id].row,
                format: element.format === "sum" ? "" : "sum",
                value: formOriginalText[e.target.id].value,
              },
            ];
            setNumbersSum(true);
          } else {
            newArray_2 = [...newArray_2, formOriginalText[index]];
          }
        });

        setFormOriginalText(newArray_2);
        break;

      case "Muokkaa":
        Number(formIndex) === -1
          ? setFormIndex(e.target.id)
          : Number(formIndex) === Number(index) &&
            Number(index) === Number(e.target.id)
          ? setFormIndex(-1)
          : setFormIndex(e.target.id);
        break;

      case "Poista":
        formOriginalText.forEach((element, index) => {
          if (index !== Number(e.target.id)) {
            newArray_2 = [...newArray_2, formOriginalText[index]];
          }
        });

        setFormOriginalText(newArray_2);
        setFormIndex(-1);

        break;
      default:
        throw new Error("Tapahtui virhe");
    }
  };
  return (
    <>
      {line.length === 0 &&
      (fieldType === "Poista" || fieldType === "Muokkaa") ? (
        <button
          className="line-style-2"
          id={index}
          value={line}
          onClick={handleFieldClick}
        >
          {fieldType}
        </button>
      ) : (
        <button className="line-style" id={index} onClick={handleFieldClick}>
          {line}
        </button>
      )}
    </>
  );
}

export default FieldAddition;
