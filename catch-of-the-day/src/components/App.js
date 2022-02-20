import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {

    // Creamos un estado default
    state = {
        fishes: {},
        order: {}
    }

    addFish = (fish) => {
        const stateFishes = {...this.state.fishes};
        stateFishes[Date.now()] = fish;

        this.setState({
            // Acá le pasamos qué clave del objeto estado queremos updatear
            fishes: stateFishes
        })
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood" year={1960}/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;