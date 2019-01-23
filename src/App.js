import React, { Component } from 'react';
import { getPersons } from './services/personService';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //Sin hacer localStorage
      //results: []

      results: this.getSavedData()
    }
    //al hacer el localStorage, a esta función la llamamos en
    //this.getData();
  }

  getSavedData(){
    const savedData= localStorage.getItem('blackData');

    if(savedData !== null) {
      return JSON.parse(savedData);

    }else {
      this.getData();
      return []
    }
  }

  saveData(data){
    localStorage.setItem('blackData', JSON.stringify(data));
  }


  getData() {
    getPersons()
      .then(data => {
        //Aqui tenemos que organizar las id de los datos, para tener los datos preparados, con todo lo que necesitamos, antes de guardarlos en el estado del componente
        //Para ello vamos a crear un array nuevo, con el id de cada elemento cambiado
        const cleanData = data.results.map((item,index) => {
          return {...item,id:index}
        });
        //guardamos en el estado los datos con las ids
        this.setState({
          results: cleanData
        })
        //guardamos en localStorage los datos con las ids
        this.saveData(cleanData);
      })
  }
  render() {
    return (
      <div className="app">
        <h1 className="app__title">Lista negra de empleados <span role="img" aria-label="WHATT">🤯</span></h1>
        <ul className="app__list">
          {this.state.results.map(item => {
            return (
              <li className="app__list-item" id={item.id} key={item.id}>
                <div className="person">
                  <h2 className="person__name">{`${item.name.title} ${item.name.first} ${item.name.last}`}</h2>
                  <img src={item.picture.large} alt={`${item.name.title} ${item.name.first}${item.name.last}`} className="person__image" />
                  <div className="person__age">{item.dob.age}</div>
                  <div className="person__city">{item.location.city}</div>
                </div>
              </li>
            );
          })}


        </ul>
      </div>
    );
  }
}

export default App;
