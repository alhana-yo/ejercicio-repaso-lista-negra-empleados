import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NoPerson extends Component {
    render() {
        return <p>No hay datos que pintar</p>     
    }
}

// NoPerson.propTypes = {
//     filteredArray: PropTypes.array.isRequired
// }
export default NoPerson;