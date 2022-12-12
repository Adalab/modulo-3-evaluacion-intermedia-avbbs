import "../styles/App.scss";
import data from "../data/list.json";
import React, { useState } from "react";

function App() {

  // VARIABLES ESTADO

  const [listData, setListData] = useState(data);
  const [newItem, setNewItem] = useState({
    name: '',
    counselor: '',
    speciality: ''
  });
  const [filterName, setfilterName] = useState('');
  const [counselorFilter, setCounselorFilter] = useState('');


  //FUNCIONES HANDLER

  const handleChangeFilterName = (ev) => {
    setfilterName(ev.target.value);

  };


  const handleChangeInput = (ev) => {
    setNewItem({
      ...newItem,
      [ev.target.name]: ev.target.value,

    });
  };


  const handleClickAddItem = () => {
    const listDataClone = [...listData, newItem];
    setListData(listDataClone);
    setNewItem({
      name: '',
      counselor: '',
      speciality: ''
    })
  };


  const handleForm = (ev) => {
    ev.preventDefault();
  };


  const handleChangeFilterCounselor = (ev) => {
    setCounselorFilter(ev.target.value);
  };

  //FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR HTML
  const renderListData = (listData) => {
    return listData
    .filter((eachItem) => eachItem.name.toLowerCase().includes(filterName))
    .map((eachItem, index) => (
      <tr key={index}>
        <td>{eachItem.name}</td>
        <td>{eachItem.counselor}</td>
        <td>{eachItem.speciality}</td>
      </tr>
    ));
  };


  const filterListData = listData.filter((eachItem) => {
    if (counselorFilter === '') {
      return true;
    } else {
      return eachItem.counselor === counselorFilter;
    }
  });


  //RETURN CON HTML
  return (
    <div className="App">
      <header>
        <h1 className="header__title">Adalabers</h1>
      </header>

      <main>
        <form onSubmit={handleForm}>

          <label htmlFor="nameAdalaber">Nombre:
            <input
             onInput={handleChangeFilterName}
             type="text"
             name="nameAdalaber"
             id="nameAdalaber"
             value={filterName}
            />
          
          </label>
          <label htmlFor="counselor">Escoge una tutora:
            <select
              onChange={handleChangeFilterCounselor}
              name="counselor"
              id="counselor"
              value={counselorFilter}
            >
              <option>Todos</option>
              <option value="Dayana">Dayana</option>
              <option value="Iván">Iván</option>
              <option value="Yanelis">Yanelis</option>
            </select>
          </label>
        </form>
        <section>
          <table className="table">
            {/*Fila de cabecera */}
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tutora</th>
                <th>Especialidad</th>
              </tr>
            </thead>
            {/* Fin fila de cabecera */}
            <tbody>
              {renderListData(filterListData)}
            </tbody>
          </table>
        </section>
        <section className="addItem">
          <h2>Añadir una adalaber</h2>
          <form onSubmit={handleForm}>
            <label htmlFor="newName">Nombre:
              <input
                onChange={handleChangeInput}
                type="text"
                name="name"
                id="newName"
                value={newItem.name}
              />
            </label>

            <label htmlFor="newCounselor">Tutora:
              <input
                onChange={handleChangeInput}
                type="text"
                name="counselor"
                id="newCounselor"
                value={newItem.counselor}
              />
            </label>

            <label htmlFor="newSpeciality">Especialidad:
              <input
                onChange={handleChangeInput}
                type="text"
                name="speciality"
                id="newSpeciality"
                value={newItem.speciality}
              />
            </label>

            <label>
              <button onClick={handleClickAddItem}>Añadir una nueva adalaber</button>
            </label>
          </form>

        </section>
      </main>
    </div>
  );
}

export default App;
