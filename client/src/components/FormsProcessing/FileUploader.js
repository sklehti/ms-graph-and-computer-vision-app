import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import appDatabase from "../../services/appDatabase";

function FileUploader({ setFormOriginalText, formOriginalText, oldName }) {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  /**
   *
   * Programatically click the hidden file input element when the Button component is clicked
   *
   * @param {*} e
   */
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  /**
   * Check if the file is in the correct format and save it in the backend folder
   *
   * @param {*} e
   * @returns File recording data
   */
  const handleUploadFile = (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) {
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|pdf|JPG|JPEG|PNG|PDF)$/)) {
      console.log("Valitse validi tiedosto muotoa: PDF,JPG,JPEG,PNG");
      return false;
    }

    const formdata = new FormData();
    formdata.append("avatar", e.target.files[0]);
    hiddenFileInput.current.value = "";

    appDatabase
      .createForm(formdata)
      .then((response) => {
        console.log("Tiedosto on haettu.");

        // Computer Vision version
        let tempArray = [];

        response.map((row) => {
          tempArray = [...tempArray, { row, format: "", value: "" }];
        });
        setFormOriginalText(tempArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 id="save-form">Tallenna lomake</h2>
      <br />

      {oldName.length > 0 ? (
        <></>
      ) : (
        <Button variant="primary" onClick={handleClick}>
          Valitse tiedosto
        </Button>
      )}

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleUploadFile}
        style={{ display: "none" }}
      />
      <br />
    </div>
  );
}

export default FileUploader;
