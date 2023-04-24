import React from "react";

function LineModification({ line, setFormIndex, index }) {
  const handleUpdateText = (e) => {
    setFormIndex(e.target.value);
  };

  return (
    <>
      {line.length > 0 ? (
        <button className="line-style" value={index} onClick={handleUpdateText}>
          {line}
        </button>
      ) : (
        <button
          className="line-style-2"
          value={index}
          onClick={handleUpdateText}
        >
          Muuta
        </button>
      )}
    </>
  );
}

export default LineModification;
