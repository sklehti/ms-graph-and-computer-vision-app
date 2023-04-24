import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function TextChanging({
  index,
  text,
  changeFormText,
  setChangeFormText,
  formOriginalText,
  setFormOriginalText,
  setFormIndex,
}) {
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

  return (
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
            value={text}
            onClick={handleTextSubmit}
          >
            Vaihda
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default TextChanging;
