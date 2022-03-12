import React from 'react';
import PropTypes from 'prop-types';
import Firebase from 'firebase';

import Login from './Login'
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import base , {firebaseApp} from '../base';
class Inventory extends React.Component{

    static propTypes = {
        fishes: PropTypes.object.isRequired,
        editFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        addFish: PropTypes.func.isRequired
    }

    state = {
        uid: null,
        owner: null
    }

    authenticate = (provider) => {

        // Aca instancio el proveedor de auth dinamicamente
        const authProvider = new Firebase.auth[`${provider}AuthProvider`](); // Ej: Es lo mismo que decir firebase.auth.FacebookAuthProvider
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.procesarLogin) // procesarLogin es una funcion que creo yo
    }

    procesarLogin = async (authData) => {
        console.log("la authdata es");
        console.log(authData);

        // Esto me trae todos los fishes y demás objetos de la tienda actual. Pongo el endpoint
        // Base.fetch es para traerme datos de Firebase
        const store = await base.fetch(this.props.storeId , { context : this});

        // Si no encuentro la clave administrador... significa que el primer login es el admin
        if(!store.administrador){
            // Base.post es para cargar datos en Firebase
            await base.post(`${this.props.storeId}/administrador`, {
                // Le paso UID porque es el Unique Identifier de un usuario
                data: authData.user?.uid || ""
            })
        }

        this.setState({
            uid: authData.user?.uid || "",
            owner: store.administrador || authData.user.uid
        })

    }

    logout = async () => {
        await Firebase.auth().signOut();
        this.setState({
            uid: null
        })
    }

    componentDidMount(){
        Firebase.auth().onAuthStateChanged( user => {
            console.log("el usuario es");
            console.log({user})
            this.procesarLogin({user});
        })
    }

    render(){

        if(!this.state.uid) {
            return(
                <Login authenticate={this.authenticate}></Login>
            )
        } else if(this.state.uid != this.state.owner){
            return(
                <div>
                    <p>El usuario ingresado no es administrador de la tienda</p>
                    <button onClick={this.logout}>Logout</button>
                </div>

            )
        } else{
            return(
                <div className="inventory">
                    <h2>Inventory</h2>

                    <button onClick={this.logout}>Logout</button>
                    {Object.keys(this.props.fishes).map(key =>
                        <EditFishForm key={key} index={key} fish={this.props.fishes[key]} editFish={this.props.editFish} deleteFish={this.props.deleteFish} /> 
                    )}
                    <AddFishForm addFish={this.props.addFish}/>
                    <button onClick={this.props.loadSampleFishes}>Agregar Pescados Default</button>
                </div>
            )
        }
    }
}

export default Inventory;