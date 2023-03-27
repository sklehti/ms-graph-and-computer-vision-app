import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function SelectFieldModal({
  setFormOriginalText,
  formOriginalText,
  showSelectModal,
  setShowSelectModal,
  setSelectFields,
  selectFields,
  numberInputIndex,
}) {
  const [option, setOption] = useState("");
  const [tempSelectFields, setTempSelectFields] = useState(["Valitse"]);

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  const handleAddOption = (e) => {
    let newOption = option.trim();

    if (newOption.length > 0) {
      setTempSelectFields([...tempSelectFields, option]);
      setOption("");
      setSelectFields([]);
    } else {
      console.log("Lisää kenttään arvo.");
      setOption("");
    }
  };

  const handleClose = () => {
    if (tempSelectFields.length > 1) {
      setSelectFields(tempSelectFields);
    } else if (selectFields.length === 0) {
      console.log("Täytä kentät!");
      return false;
    }

    let newArray = formOriginalText.map((element, i) => {
      if (i === numberInputIndex) {
        return {
          row: formOriginalText[numberInputIndex].row,
          format: formOriginalText[numberInputIndex].format,
          value: tempSelectFields.length > 1 ? tempSelectFields : selectFields,
        };
      } else {
        return element;
      }
    });
    setFormOriginalText(newArray);
    setShowSelectModal(false);
  };

  const handleCancel = (e) => {
    if (tempSelectFields.length > 1) {
      setSelectFields(tempSelectFields);
    }

    let newArray = formOriginalText.map((element, i) => {
      if (i === numberInputIndex) {
        return {
          row: formOriginalText[numberInputIndex].row,
          format: "",
          value: "",
        };
      } else {
        return element;
      }
    });
    setFormOriginalText(newArray);

    setShowSelectModal(false);
  };

  return (
    <>
      <Modal show={showSelectModal} size="sm">
        <Modal.Header>
          <Modal.Title>Nimeä kentät</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form> */}
          <Form.Group className="mb-3" controlId="select">
            <Form.Control
              placeholder={selectFields}
              value={option}
              onChange={handleOption}
            />
            <br />
          </Form.Group>
          <Button onClick={handleAddOption}>Lisää</Button>
          {/* </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Peruuta
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Vahvista
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SelectFieldModal;
