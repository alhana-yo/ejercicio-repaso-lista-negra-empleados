import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Person from './Person';

class PersonList extends Component {
    render() {
        const {filteredArray} = this.props;
        return (
            <ul className="app__list">
            {filteredArray.map(item => {
              return (
                <li className="app__list-item" id={item.id} key={item.id}>
                  <Person fullName={`${item.name.title} ${item.name.first} ${item.name.last}`} image = {item.picture.large} age = {item.dob.age} city = {item.location.city}/>
                </li>
              );
            })}
          </ul>
        );
    }
}

PersonList.propTypes = {
    filteredArray: PropTypes.array.isRequired
}
export default PersonList;