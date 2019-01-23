import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoPerson from '../components/NoPerson';

class Person extends Component {

    render() {

        //Errores que están ocurriendo:
        //1- que el id que nos pasen, no xista en el array
        //2- que el array esté vacio. No podemos pintar este componenete
        const {filteredArray, personId} = this.props;

        if(filteredArray.length === 0 || personId >=filteredArray.length){
            //no hay datos que pintar
            //Lo suyo es que hiciéramos un componente, donde nos dejara vovler atrás
            return <NoPerson />
        }else{
            //si hay datos
             //Nos sacamos la persona con esa id
        const selectedPerson = filteredArray[personId];
        const fullName = `${selectedPerson.name.first} ${selectedPerson.name.last}`;
        const image = selectedPerson.picture.large;
        const age = selectedPerson.dob.age;
        const city = selectedPerson.location.city;
        return (
            <div className="person__detail">
                <h2 className="person__name">{fullName}</h2>
                <img src={image} alt={fullName} className="person__image" />
                <div className="person__age">{age}</div>
                <div className="person__city">{city}</div>
            </div>

        );
        }

    }
}

Person.propTypes = {
    
    filteredArray: PropTypes.array.isRequired,
    
    personId: PropTypes.number.isRequired
}
export default Person;