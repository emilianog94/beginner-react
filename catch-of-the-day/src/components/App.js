import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
class App extends React.Component {

    // Creamos un estado default
    state = {
        fishes: {},
        order: {}
    }

    componentDidMount(){
        // Obtengo la ruta de la store actual
        const storeRoute = this.props.match.params.storeName;
        const orderStorageRef = localStorage.getItem(storeRoute);

        if(orderStorageRef){
            this.setState({
                order: JSON.parse(orderStorageRef)
            })
        }

        // Le indico a firebase que sincronice el state de fishes con un nuevo state storeRoute/fishes
        this.ref = base.syncState(`${storeRoute}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }

    componentDidUpdate(){
        const order = this.state.order;
        localStorage.setItem(this.props.match.params.storeName, JSON.stringify(order));
    }

    // Prevenir memory leaks
    componentWillUnmount(){
        base.removeBinding(this.ref)
    }

    addFish = fish => {
        const stateFishes = {...this.state.fishes};
        stateFishes[Date.now()] = fish;

        this.setState({
            // Acá le pasamos qué clave del objeto estado queremos updatear
            fishes: stateFishes
        })
    }

    editFish = (fish,index) => {
        const stateFishes = {...this.state.fishes};
        stateFishes[index] = fish;

        this.setState({
            fishes: stateFishes
        })
    }

    deleteFish = (key) => {
        const stateFishes = {...this.state.fishes};
        stateFishes[key] = null;

        this.setState({
            fishes: stateFishes
        })
    }

    deleteOrderItem = (key) => {
        const stateOrder = {...this.state.order};
        delete stateOrder[key];

        this.setState({
            order: stateOrder
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
                <Order fishes={this.state.fishes} order={this.state.order} deleteOrderItem={this.deleteOrderItem} />
                <Inventory fishes={this.state.fishes} editFish={this.editFish} addFish={this.addFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;