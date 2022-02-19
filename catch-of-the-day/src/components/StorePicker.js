import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component{

    // Creo referencia para tener a mano el valor del Input
    inputNombreTienda = React.createRef();

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.inputNombreTienda);
        const valor = this.inputNombreTienda.current.value;

        // Corro el metodo push de React Router Dom para cambiar la URL
        this.props.history.push(`/store/${valor}`);
    }

    render(){
        return(
        <>
            {/* Comentario de Prueba */}
            <form className="store-selector" onSubmit={this.handleSubmit}>
                <h2>Please enter a Store Name</h2>
                <input ref={this.inputNombreTienda} type="text" required placeholder="Store Name" defaultValue={getFunName()} />
                <button type="submit">Visit Store</button>
            </form>
        </>
        );
    }
}

export default StorePicker;
