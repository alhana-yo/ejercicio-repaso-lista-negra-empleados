import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    render() {
        const {KeyupAction} = this.props;
        return (
            <div className="app__input">
                <div className="app__filter-itm">
                    <input type="text" className="app__filter-full-name" placeholder="Busca a los culpables" onKeyUp={KeyupAction} />
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    KeyupAction: PropTypes.func.isRequired
}
export default Filter;