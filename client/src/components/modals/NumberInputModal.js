import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function NumberInputModal({
  showNumberModal,
  setShowNumberModal,
  formOriginalText,
  setFormOriginalText,
  numberInputIndex,
  setMinNumber,
  setMaxNumber,
  minNumber,
  maxNumber,
}) {
  const handleMinNumber = (e) => {
    setMinNumber(e.target.value);
  };

  const handleMaxNumber = (e) => {
    setMaxNumber(e.target.value);
  };

  const handleClose = (e) => {
    if (minNumber === null || maxNumber === null) {
      console.log("Aseta miniminumero ja maksiminumero!");
    } else {
      let newArray = formOriginalText.map((element, i) => {
        if (i === numberInputIndex) {
          return {
            row: formOriginalText[numberInputIndex].row,
            format: "number",
            min: minNumber,
            max: maxNumber,
            value: formOriginalText[numberInputIndex].value,
          };
        } else {
          return element;
        }
      });
      setFormOriginalText(newArray);
      setShowNumberModal(false);
    }
  };

  const handleCancel = (e) => {
    let newArray = formOriginalText.map((element, i) => {
      if (i === numberInputIndex) {
        return {
          row: formOriginalText[numberInputIndex].row,
          format: "",

          value: formOriginalText[numberInputIndex].value,
        };
      } else {
        return element;
      }
    });

    setFormOriginalText(newArray);
    setShowNumberModal(false);
  };

  return (
    <>
      <Modal show={showNumberModal} size="sm">
        <Modal.Header>
          <Modal.Title>Valitse arvot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="minInput">
              <Form.Label>Minimi arvo:</Form.Label>
              <Form.Control
                type="number"
                placeholder={minNumber}
                autoFocus
                onChange={handleMinNumber}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="maxInput">
              <Form.Label>Maksimi arvo:</Form.Label>
              <Form.Control
                type="number"
                placeholder={maxNumber}
                autoFocus
                onChange={handleMaxNumber}
              />
            </Form.Group>
          </Form>
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

export default NumberInputModal;
