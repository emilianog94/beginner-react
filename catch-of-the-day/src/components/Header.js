import React from 'react';

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

export default Header;