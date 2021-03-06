import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component{

    static propTypes = {
        fish: PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired
        }),
        index: PropTypes.string,
        editFish: PropTypes.func
    }

    handleChange = event => {
        // Utilizo sintaxis de ES6 para actualizar las key y valores sin necesidad de hardcodearlos
        let updatedFish = { 
            ...this.props.fish ,
            [event.currentTarget.name] : event.currentTarget.value
        }

        this.props.editFish(updatedFish, this.props.index);
    }

    render(){
        return(
            <div className="fish-edit">
                <input type="text" name="name" placeholder="Name" value={this.props.fish.name} onChange={this.handleChange} />
                <input type="number" name="price" placeholder="Price" value={this.props.fish.price}  onChange={this.handleChange}  />
                <select name="status" value={this.props.fish.status}  onChange={this.handleChange} >
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea name="desc" placeholder="Desc"  value={this.props.fish.desc} onChange={this.handleChange} ></textarea>
                <input type="text" name="image" placeholder="Image" value={this.props.fish.image}  onChange={this.handleChange} />
                <button className="delete" onClick={() => {this.props.deleteFish(this.props.index)}}>Delete Fish</button>
            </div>
        )
    }
}


export default EditFishForm;