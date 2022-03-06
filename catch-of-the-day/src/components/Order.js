import React from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component{

    renderItems = (key) => {
        const fish = this.props.fishes[key];

        if( !fish ){
            return null;
        }

        if(fish.status == "available") {
            return(
                <CSSTransition classNames="order" key={key} timeout={{enter: 500, exit: 500}}>
                    {/* li tomará la clase que le pasé arriba en css-transition para animarse */}
                    <li>
                        <span>
                            <span>{this.props.order[key]}</span> 
                            lbs {fish.name} -&nbsp;
                            {formatPrice(fish.price)}  
                            <button onClick={() => {this.props.deleteOrderItem(key)}}>X</button>
                        </span>

                    </li>
                </CSSTransition>
            )
        } 
        else{
            return(
                <CSSTransition classNames="order" key={key} timeout={{enter: 2000, exit: 2000}}>
                    <li key={key}>Sorry! the fish you previously picked ({fish.name}) is unavailable right now!</li>
                </CSSTransition>
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
                <TransitionGroup component="ul" className="order">
                    {Object.keys(this.props.order).map(this.renderItems)}
                </TransitionGroup>

                <div className="total">
                    Total: {this.renderTotal()}
                </div>
            </div>
        )
    }
}

export default Order;