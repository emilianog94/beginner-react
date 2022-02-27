import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component{

    renderItems = (key) => {
        const fish = this.props.fishes[key];

        if( !fish ){
            return null;
        }

        if(fish.status == "available") {
            return(
                <li key={key}>{this.props.order[key]} lbs {fish.name} - {formatPrice(fish.price)} </li>
            )
        } else{
            return(
                <li key={key}>Sorry! the fish you previously picked ({fish.name}) is unavailable right now!</li>
            )
        }
    }

    renderTotal = () => {
        const fishes = Object.keys(this.props.order);
        const precio = fishes.reduce( (total, key) => {
            const fish = this.props.fishes[key];
            if(!fish) {
                return null;
            }
            const price = fish.price;
            const quantity =  this.props.order[key]
            fish.status === "available" ? total = total + ( quantity * price) : total
            return total;
        },0);
        return formatPrice(precio);
    }

    render(){
        return(
            <div className="order-wrap">
                <ul className="order">
                    {Object.keys(this.props.order).map(this.renderItems)}
                </ul>

                <div className="total">
                    Total: {this.renderTotal()}
                </div>
            </div>
        )
    }
}

export default Order;