import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
        return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize', color: 'blue'}}>{ingKey}</span>: {props.ingredients[ingKey]}
            </li>
        );
    });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
        </Auxiliary>
    )
}

export default orderSummary;