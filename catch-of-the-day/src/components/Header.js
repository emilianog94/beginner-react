import React from 'react';
import PropTypes from 'prop-types';

// Expresado como function stateless component
const Header = (props) => {
    const {tagline,year} = props;

    return(
        <header className="top">
            <h1>Catch 
                <span className="ofThe">
                    <span className="of">Of</span>
                    <span className="the">The</span> 
                </span>
                Day
            </h1>

            <h3 className="tagline">
                <span>{tagline} since {year}</span>
            </h3>
        </header>    
    )
}

Header.propTypes = {
    tagline: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
}

export default Header;