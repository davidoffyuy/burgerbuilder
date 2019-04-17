import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    const ingredientsList = [];

    for (let key in props.ingredients) {
        ingredientsList.push(<span key={key} style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{key}: ({props.ingredients[key]})</span>);
    }

    return (
        <div className={classes.Order}>
            {ingredientsList}
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;