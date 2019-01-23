import React, { Component } from 'react';
import { getPersons } from './services/personService';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

        query: '',
      //Sin hacer localStorage
      //results: []
      results: this.getSavedData()
    }
    //al hacer el localStorage, a esta función la llamamos en
    //this.getData();
    this.getUserInput = this.getUserInput.bind(this);
  }


  getUserInput(e){
    const userQuery = e.currentTarget.value;
    this.setState({
      query: userQuery
    });
  }
  filterData(){
    const filteredResults = this.state.results.filter(item => {
      const fullName = `${item.name.first} ${item.name.last}`;
      if (fullName.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())){ //en cada item, compongo el nombre completo y ve si lo que ha puesto el usuario está incluido
        return true; //devuelve el objeto entero
      }else{
        return false; //no devuelve nada
      }
      //el if hecho con un ternario
      //return (fullName.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())) ? true: false; 
    });

    return filteredResults;

  }

  getSavedData() {
    const savedData = localStorage.getItem('blackData');

    if (savedData !== null) {
      return JSON.parse(savedData);

    } else {
      this.getData();
      return []
    }
  }

  saveData(data) {
    localStorage.setItem('blackData', JSON.stringify(data));
  }


  getData() {
    getPersons()
      .then(data => {
        //Aqui tenemos que organizar las id de los datos, para tener los datos preparados, con todo lo que necesitamos, antes de guardarlos en el estado del componente
        //Para ello vamos a crear un array nuevo, con el id de cada elemento cambiado
        const cleanData = data.results.map((item, index) => {
          return { ...item, id: index }
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
    const arrayFromFilter = this.filterData();
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Lista negra de empleados <span role="img" aria-label="WHATT">🤯</span></h1>
          <div className="app__input">
            <div className="app__filter-itm">
              <input type="text" className="app__filter-full-name" placeholder="Busca a los culpables" onKeyUp={this.getUserInput}/>
            </div>
          </div>
        </header>
        <main className="app__main">
          <ul className="app__list">
            {/* {this.state.results.map(item => { */}
            {arrayFromFilter.map(item => {

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
        </main>

      </div>
    );
  }
}

export default App;
