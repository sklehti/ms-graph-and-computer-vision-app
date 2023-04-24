import React, { useState, useEffect } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

function AllActionButtons({ setChooseAction }) {
  const [activeButton, setActiveButton] = useState(1);

  useEffect(() => {
    setChooseAction("Muokkaa");
  }, []);

  const handleChange = (val) => {
    setActiveButton(val);
  };

  return (
    <div className="all-action-buttons-style">
      <ToggleButtonGroup
        style={{ margin: "10px" }}
        type="radio"
        name="buttonGroup"
        value={activeButton}
        onChange={handleChange}
      >
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-1"
          value={1}
          onClick={() => setChooseAction("Muokkaa")}
        >
          Muokkaa
        </ToggleButton>
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-2"
          value={2}
          onClick={() => setChooseAction("Rivi")}
        >
          Rivi
        </ToggleButton>
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-3"
          value={3}
          onClick={() => setChooseAction("Tekstikenttä")}
        >
          Tekstikenttä
        </ToggleButton>
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-4"
          value={4}
          onClick={() => setChooseAction("Ruutukenttä")}
        >
          Ruutukenttä
        </ToggleButton>
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-5"
          value={5}
          onClick={() => setChooseAction("Numerokenttä")}
        >
          Numerokenttä
        </ToggleButton>
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-6"
          value={6}
          onClick={() => setChooseAction("Valikkokenttä")}
        >
          Valikkokenttä
        </ToggleButton>
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-7"
          value={7}
          onClick={() => setChooseAction("Pisteet")}
        >
          Pisteet
        </ToggleButton>
        <ToggleButton
          style={{ borderColor: "#fff" }}
          variant="primary"
          id="tbg-radio-8"
          value={8}
          onClick={() => setChooseAction("Poista")}
        >
          Poista
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default AllActionButtons;
