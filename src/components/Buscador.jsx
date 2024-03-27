import React from "react";

const Buscador = ({ setSearchDay }) => {

    const handleInputChange = (event) => {
        setSearchDay(event.target.value);
    };

    return (
        <div className="mb-4">
            <input
                id="buscador"
                type="text"
                className="form-control"
                placeholder="Buscar nombre feriado"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Buscador;