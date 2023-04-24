import React from "react";

function LineDeleting({
  lineInfo,
  index,
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

  return (
    <>
      {lineInfo.row.length > 0 ? (
        <button
          className="line-style"
          id={index}
          value={lineInfo.row}
          onClick={handleDeleteRow}
        >
          {lineInfo.row}
        </button>
      ) : (
        <button
          className="line-style-2"
          id={index}
          value={lineInfo.row}
          onClick={handleDeleteRow}
        >
          poista
        </button>
      )}
    </>
  );
}

export default LineDeleting;
