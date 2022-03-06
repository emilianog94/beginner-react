import React from 'react';
import PropTypes from 'prop-types';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
class Inventory extends React.Component{

    static propTypes = {
        fishes: PropTypes.object.isRequired,
        editFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        addFish: PropTypes.func.isRequired

    }

    render(){
        return(
            <div className="inventory">

                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(key =>
                    <EditFishForm key={key} index={key} fish={this.props.fishes[key]} editFish={this.props.editFish} deleteFish={this.props.deleteFish} /> 
                )}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Agregar Pescados Default</button>
            </div>
        )
    }
}

export default Inventory;