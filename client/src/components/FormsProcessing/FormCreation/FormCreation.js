import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import appDatabase from "../../../services/appDatabase";
import NumberInputModal from "../../modals/NumberInputModal";
import ButtonOne from "./ButtonOne";
import ButtonTwo from "./ButtonTwo";
import ButtonThree from "./ButtonThree";
import SelectFieldModal from "../../modals/SelectFieldModal";

function FormCreation({
  setFileName,
  fileName,
  formOriginalText,
  setFormOriginalText,
  allForms,
  setOldName,
  oldName,
  numbersSum,
  setNumbersSum,
}) {
  const [changeFormText, setChangeFormText] = useState("");
  const [formIndex, setFormIndex] = useState(-1);
  const [updateAddbutton, setUpdateAddbutton] = useState(1);
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectFields, setSelectFields] = useState([]);
  const [numberInputIndex, setNumberInputIndex] = useState(-1);

  const [minNumber, setMinNumber] = useState(null);
  const [maxNumber, setMaxNumber] = useState(null);

  const handleFileName = (e) => {
    setFileName(e.target.value);
  };

  const handleButtonOne = () => {
    setUpdateAddbutton(1);
  };

  const handleButtonTwo = () => {
    setUpdateAddbutton(2);
  };

  const handleButtonThree = () => {
    setUpdateAddbutton(3);
  };

  const handleUpdateText = (e) => {
    setChangeFormText(e.target.value);
  };

  /**
   * function changes the contents of the selected line to
   * the contents stored in changeFormText.
   * @param {*} e
   */
  const handleTextSubmit = (e) => {
    let newArray = [];

    formOriginalText.forEach((element, index) => {
      if (index === Number(e.target.id)) {
        formOriginalText[e.target.id].row = changeFormText;

        newArray = [
          ...newArray,
          {
            row: changeFormText,
            format: formOriginalText[e.target.id].format,
            value: formOriginalText[e.target.id].value,
          },
        ];
      } else {
        newArray = [...newArray, formOriginalText[index]];
      }
    });

    setFormOriginalText(newArray);
    setChangeFormText("");
    setFormIndex(-1);
  };

  /**
   * This function saves the form in a customised format
   * in the database.
   *
   * @returns Return false if conditions are not correct.
   */
  const handleFormSaving = () => {
    let trimFileName = fileName.trim();

    let sameName = allForms.map((f) => f.name).indexOf(trimFileName) > -1;

    if (trimFileName.match(/[?%+"#€&/()=*@]/g)) {
      console.log("Älä käytä erikoismerkkejä lomakkeen nimeämisessä.");
      return false;
    }

    if (trimFileName.length > 50) {
      console.log("Lomakkeen nimi on liian pitkä.");
      return false;
    }

    let operation = "";

    if (numbersSum === true) {
      operation = "sum";
    }

    // counts the number of all fields
    let fieldValue = 0;
    formOriginalText.map((r) => {
      if (r.format.length > 0 && r.format !== "sum") {
        fieldValue += 1;
      }
    });

    if (trimFileName.length > 0 && !sameName && oldName.length === 0) {
      const formInfo = {
        name: trimFileName,
        doc: formOriginalText,
        operation: operation,
        fields: fieldValue,
      };
      appDatabase.saveForm(formInfo).then((response) => {
        console.log(response);
        setFormOriginalText(null);
        setFileName("");
      });
    } else if (trimFileName.length > 0 && oldName.length > 0) {
      const formInfo = {
        oldName: oldName,
        name: trimFileName,
        doc: formOriginalText,
        operation: operation,
        fields: fieldValue,
      };

      appDatabase.updateForm(formInfo).then((response) => {
        if (response.status === 1) {
          console.log("Lomake päivitetty");

          setFormOriginalText(null);
          setFileName("");
          setOldName("");
          setMinNumber(null);
          setMaxNumber(null);
          setNumbersSum(false);
        }
      });
    } else {
      console.log(
        "Lomakkeelta puuttuu nimi tai samanniminen tiedosto löytyy jo."
      );
    }
    setShowNumberModal(false);
    setShowSelectModal(false);
  };

  return (
    <div id="form-creation">
      {/* computer vision */}
      {formOriginalText !== null ? (
        <div>
          <br />
          <br />
          <label className="form-title-label">Tiedoston nimi:</label>
          <input
            className="form-title-input"
            value={fileName}
            onChange={handleFileName}
          />

          <div
            style={{
              paddingTop: "30px",
              paddingBottom: "30px",
              textAlign: "left",
            }}
          >
            <div>
              <Button
                variant="primary"
                onClick={handleButtonOne}
                className="form-change-button"
              >
                Vaihe 1
              </Button>
              <Button
                variant="primary"
                onClick={handleButtonTwo}
                className="form-change-button"
              >
                Vaihe 2
              </Button>
              <Button
                variant="primary"
                onClick={handleButtonThree}
                className="form-change-button"
              >
                Vaihe 3
              </Button>
              {updateAddbutton === 1 ? (
                <p>Muuta, lisää ja poista lomakkeen rivejä.</p>
              ) : updateAddbutton === 2 ? (
                <p>
                  Lisää lomakkeeseen syötekenttiä. Voit lisätä tekstikenttiä,
                  numerovalintakenttiä, valintaruutuja ja valintalistoja.
                </p>
              ) : (
                <p>
                  Lisää lomakkeeseen lomakkeen yhteenlaskettava summa (onnistuu
                  vain numerokenttien valinnassa). Voit lisätä yhteenlaskettavan
                  summan haluamaasi kohtaan painamalla Laske pisteet -paniketta.
                </p>
              )}
            </div>
            <div className="form-table-style">
              {formOriginalText.map((t, index) => (
                <div key={index}>
                  {updateAddbutton === 1 ? (
                    <>
                      <ButtonOne
                        index={index}
                        text={t}
                        formOriginalText={formOriginalText}
                        setFormOriginalText={setFormOriginalText}
                        setFormIndex={setFormIndex}
                      />
                    </>
                  ) : updateAddbutton === 2 ? (
                    <ButtonTwo
                      index={index}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      setShowNumberModal={setShowNumberModal}
                      setShowSelectModal={setShowSelectModal}
                      setNumberInputIndex={setNumberInputIndex}
                    />
                  ) : (
                    <ButtonThree
                      index={index}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      numbersSum={numbersSum}
                      setNumbersSum={setNumbersSum}
                    />
                  )}
                  {t.row}
                  {Number(index) === Number(formIndex) ? (
                    <div>
                      <Form>
                        <InputGroup className="mb-3">
                          <Form.Control
                            aria-label="Muuta tekstiä"
                            aria-describedby={index}
                            onChange={handleUpdateText}
                          />
                          <Button
                            variant="primary"
                            id={index}
                            value={t}
                            onClick={handleTextSubmit}
                          >
                            Vaihda
                          </Button>
                        </InputGroup>
                      </Form>
                    </div>
                  ) : (
                    <></>
                  )}
                  {t.format === "input" ? (
                    <input readOnly className="form-table-input" type="text" />
                  ) : (
                    <></>
                  )}
                  {t.format === "checkbox" ? (
                    <input
                      checked=""
                      readOnly
                      className="form-table-checkbox"
                      type="checkbox"
                    />
                  ) : (
                    <></>
                  )}
                  {t.format === "number" ? (
                    <>
                      {showNumberModal &&
                      Number(index) === Number(numberInputIndex) ? (
                        <NumberInputModal
                          showNumberModal={showNumberModal}
                          setShowNumberModal={setShowNumberModal}
                          formOriginalText={formOriginalText}
                          setFormOriginalText={setFormOriginalText}
                          numberInputIndex={numberInputIndex}
                          setMinNumber={setMinNumber}
                          setMaxNumber={setMaxNumber}
                          minNumber={minNumber}
                          maxNumber={maxNumber}
                        />
                      ) : (
                        <></>
                      )}
                      <input
                        readOnly
                        className="form-table-number"
                        type="number"
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {t.format === "select" ? (
                    <>
                      {showSelectModal &&
                      Number(index) === Number(numberInputIndex) ? (
                        <SelectFieldModal
                          setFormOriginalText={setFormOriginalText}
                          formOriginalText={formOriginalText}
                          showSelectModal={showSelectModal}
                          setShowSelectModal={setShowSelectModal}
                          setSelectFields={setSelectFields}
                          selectFields={selectFields}
                          numberInputIndex={numberInputIndex}
                        />
                      ) : (
                        <></>
                      )}
                      <select disabled>
                        <option>Valitse:</option>
                      </select>
                    </>
                  ) : (
                    <></>
                  )}
                  {t.format === "sum" ? (
                    <input
                      checked=""
                      readOnly
                      type="text"
                      style={{ width: "60px" }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button variant="primary" onClick={handleFormSaving}>
            Tallenna lomake
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      <br />
    </div>
  );
}

export default FormCreation;
