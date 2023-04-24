import React, { useState } from "react";
import NumberInputModal from "../../modals/NumberInputModal";
import SelectFieldModal from "../../modals/SelectFieldModal";
import TextChanging from "./TextChanging";
import FormChanging from "./FormChanging";
import AllActionButtons from "./AllActionButtons";
import LineAddition from "./LineChanges/LineAddition";
import InputfieldAddition from "./LineChanges/InputfieldAddition";
import LineDeleting from "./LineChanges/LineDeleting";
import NumberFieldAddition from "./LineChanges/NumberFieldAddition";
import CheckboxFieldAddition from "./LineChanges/CheckboxFieldAddition";
import SelectFieldAddition from "./LineChanges/SelectFieldAddition";
import Totalpoints from "./LineChanges/Totalpoints";
import LineModification from "./LineChanges/ LineModification";

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
  const [showNumberModal, setShowNumberModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectFields, setSelectFields] = useState([]);
  const [numberInputIndex, setNumberInputIndex] = useState(-1);

  const [minNumber, setMinNumber] = useState(null);
  const [maxNumber, setMaxNumber] = useState(null);

  const [chooseAction, setChooseAction] = useState("");

  const handleFileName = (e) => {
    setFileName(e.target.value);
  };

  return (
    <div id="form-creation">
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
            <AllActionButtons setChooseAction={setChooseAction} />

            <div className="form-table-style">
              {formOriginalText.map((t, index) => (
                <div key={index}>
                  {chooseAction === "Muokkaa" ? (
                    <LineModification
                      line={t.row}
                      setFormIndex={setFormIndex}
                      index={index}
                    />
                  ) : chooseAction === "Rivi" ? (
                    <LineAddition
                      line={t.row}
                      index={index}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      setFormIndex={setFormIndex}
                    />
                  ) : chooseAction === "Poista" ? (
                    <LineDeleting
                      lineInfo={t}
                      index={index}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      setFormIndex={setFormIndex}
                    />
                  ) : chooseAction === "Tekstikenttä" ? (
                    <InputfieldAddition
                      line={t.row}
                      index={index}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                    />
                  ) : chooseAction === "Numerokenttä" ? (
                    <NumberFieldAddition
                      line={t.row}
                      index={index}
                      setNumberInputIndex={setNumberInputIndex}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      setShowNumberModal={setShowNumberModal}
                    />
                  ) : chooseAction === "Ruutukenttä" ? (
                    <CheckboxFieldAddition
                      line={t.row}
                      index={index}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                    />
                  ) : chooseAction === "Valikkokenttä" ? (
                    <SelectFieldAddition
                      line={t.row}
                      index={index}
                      setNumberInputIndex={setNumberInputIndex}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      setShowSelectModal={setShowSelectModal}
                    />
                  ) : chooseAction === "Pisteet" ? (
                    <Totalpoints
                      line={t.row}
                      index={index}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      setNumbersSum={setNumbersSum}
                    />
                  ) : (
                    <> {t.row}</>
                  )}

                  {Number(index) === Number(formIndex) ? (
                    <TextChanging
                      index={index}
                      text={t}
                      changeFormText={changeFormText}
                      setChangeFormText={setChangeFormText}
                      formOriginalText={formOriginalText}
                      setFormOriginalText={setFormOriginalText}
                      setFormIndex={setFormIndex}
                    />
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
          <FormChanging
            fileName={fileName}
            setFileName={setFileName}
            oldName={oldName}
            setOldName={setOldName}
            setMinNumber={setMinNumber}
            setMaxNumber={setMaxNumber}
            allForms={allForms}
            numbersSum={numbersSum}
            setNumbersSum={setNumbersSum}
            formOriginalText={formOriginalText}
            setFormOriginalText={setFormOriginalText}
            setShowNumberModal={setShowNumberModal}
            setShowSelectModal={setShowSelectModal}
          />
        </div>
      ) : (
        <div></div>
      )}
      <br />
    </div>
  );
}

export default FormCreation;
