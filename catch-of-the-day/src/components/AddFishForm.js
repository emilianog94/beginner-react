import React from 'react';
import PropTypes from 'prop-types'

class AddFishForm extends React.Component {

    static propTypes = {
        addFish: PropTypes.func.isRequired,
    }

    nameRef = React.createRef();
    statusRef = React.createRef();
    priceRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    createFish = (e) => {
        e.preventDefault();

        const fish = {
            name: this.nameRef.current.value,
            status: this.statusRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        }

        this.props.addFish(fish);
        e.currentTarget.reset();
    }

    render() {
        return(
            <form className="fish-edit" action="" onSubmit={this.createFish}>
                <input ref={this.nameRef} type="text" name="name" placeholder="Name" required />
                <input ref={this.priceRef} type="number" name="price" placeholder="Price" required />
                <select ref={this.statusRef} name="status" required>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea ref={this.descRef} name="desc" placeholder="Desc" required></textarea>
                <input ref={this.imageRef} type="text" name="image" placeholder="Image" required/>
                <button type="submit">Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm;
