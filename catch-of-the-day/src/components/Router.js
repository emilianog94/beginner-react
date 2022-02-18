import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Componentes propios
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={StorePicker}/>
                <Route path="/store/:storeName" component={App}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;