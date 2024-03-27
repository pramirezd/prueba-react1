import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';

const API_URL = 'https://api.victorsanmartin.com/feriados/en.json';
const ERROR_MESSAGE = 'Failed to fetch data';

export const MiApi = () => {
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [searchDay, setSearchDay] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(ERROR_MESSAGE);
            }
            const data = await response.json();
            setData(data.data);
            setDataFilter(data.data);
        } catch (error) {
            console.error(ERROR_MESSAGE, error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        const dataFilter = data
        .filter(holiday => 
          holiday.title.toLowerCase().includes(searchDay.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title));
        setDataFilter(dataFilter);
    }, [searchDay, data]);


    const holidays = dataFilter.map((holiday, index) => (
        <tr key={index}>
            <td>{holiday.date}</td>
            <td>{holiday.title}</td>
            <td>{holiday.type}</td>
            <td>{holiday.inalienable ? 'Si' : 'No'}</td>
        </tr>
    ))

    return (
    <div className='d-flex flex-column align-items-center justify-content-center m-5'>
        <h2>Feriados en Chile</h2>
        <Buscador 
            setSearchDay={setSearchDay} 
        />
        <div className="col-20 col-lg-10 mb-2">
          <table className="table table-responsive table-striped table-hover table-bordered border-secondary text-center">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre Feriado</th>
                <th>Tipo Feriado</th>
                <th>Feriado Irrenunciable</th>
              </tr>
            </thead>
            <tbody>
              {holidays}
            </tbody>
          </table>
        </div>
        <footer>Pablo Ramirez &reg; 2024 &copy;</footer>
    </div>
    )
};
