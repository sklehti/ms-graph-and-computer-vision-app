import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function PersonFiles({ folderInfo }) {
  /**
   * open your OneDrive files
   */
  const handleOpenFileLink = async (e) => {
    window.open(folderInfo, "_blank");
  };

  return (
    <div>
      <br />
      <h2 id="all-files">Omat tiedostosi</h2>
      <br />
      {folderInfo.length > 0 ? (
        <div>
          <Button variant="primary" onClick={handleOpenFileLink}>
            Tarkastele tiedostojasi
          </Button>
        </div>
      ) : (
        <div>
          <p>Sinulla ei ole vielä tallennettuja tiedostoja.</p>
          <></>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default PersonFiles;
