import React from "react";
import FormSaving from "./FormSaving";

function FormFilling({ selectedForm, setFolderInfo, setSelectedForm }) {
  const addValueOfForm = (id, newValue) => {
    let newArray = [];

    selectedForm.doc.forEach((element, index) => {
      if (index === Number(id)) {
        newArray = [
          ...newArray,
          {
            row: element.row,
            format: element.format,
            value: newValue,
          },
        ];
      } else {
        newArray = [...newArray, element];
      }
    });
    setSelectedForm({
      name: selectedForm.name,
      operation: selectedForm.operation,
      doc: newArray,
      fields: selectedForm.fields,
    });
  };

  const handleInputValue = (e) => {
    addValueOfForm(e.target.id, e.target.value);
  };

  const handleCheckboxValue = (e) => {
    addValueOfForm(e.target.id, "☒");
  };

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current
    // function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const handleNumberValues = (e) => {
    let newArray = [];

    selectedForm.doc.forEach((element, index) => {
      if (index === Number(e.target.id)) {
        newArray = [
          ...newArray,
          {
            row: element.row,
            format: element.format,
            value: e.target.value,
            min: element.min,
            max: element.max,
          },
        ];
      } else {
        newArray = [...newArray, element];
      }
    });
    setSelectedForm({
      name: selectedForm.name,
      operation: selectedForm.operation,
      doc: newArray,
      fields: selectedForm.fields,
    });
  };

  const handleSelectField = (e) => {
    addValueOfForm(e.target.id, e.target.value);
  };

  return (
    <div>
      {selectedForm.doc !== undefined ? (
        <div>
          <h2>{selectedForm.name}</h2>
          <div className="form-table-style">
            {selectedForm.doc.map((r, index) => (
              <div key={index}>
                {r.row.length > 0 ? (
                  r.row
                ) : r.format.length > 0 ? (
                  <></>
                ) : (
                  <br />
                )}

                {r.format === "input" ? (
                  <input
                    className="form-table-input"
                    type="text"
                    id={index}
                    onChange={handleInputValue}
                  />
                ) : r.format === "checkbox" ? (
                  <input
                    className="form-table-checkbox"
                    type="checkbox"
                    id={index}
                    onChange={handleCheckboxValue}
                  />
                ) : r.format === "number" ? (
                  <input
                    className="form-table-number"
                    type="number"
                    min={r.min}
                    max={r.max}
                    id={index}
                    onChange={handleNumberValues}
                    onWheel={numberInputOnWheelPreventChange}
                    onKeyDown={(event) => {
                      event.preventDefault();
                    }}
                  />
                ) : (
                  <></>
                )}
                {r.format === "select" ? (
                  <select id={index} onChange={handleSelectField}>
                    {Array.isArray(r.value) ? (
                      r.value.map((o, index) => (
                        <option key={index} value={o}>
                          {o}
                        </option>
                      ))
                    ) : (
                      <option value={r.value}>{r.value}</option>
                    )}
                  </select>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
          <FormSaving
            setFolderInfo={setFolderInfo}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FormFilling;
