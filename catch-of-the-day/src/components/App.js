import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
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

    addToOrder = (fish) => {
        const stateOrder = {...this.state.order};
        stateOrder[fish] ? stateOrder[fish] += 1 : stateOrder[fish] = 1

        this.setState({
            order: stateOrder
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
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(pescadoId => 
                            <Fish details={this.state.fishes[pescadoId]} addToOrder={this.addToOrder} key={pescadoId} index={pescadoId} />
                        )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;