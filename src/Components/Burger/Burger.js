import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import {withRouter} from 'react-router-dom';

const burger = ( props ) => {
        const ingredientKeys = Object.keys(props.ingredients);
        const ingredientValues = Object.values(props.ingredients);

        // transformedIngredients, before reduce, will contain an array of arrays.
        // Each sub-array is an array of <BurgerIngredient> representing THAT ingredient.
        // Once each ingredient sub-array is generated, reduce uses concat to combine them to a single array
        let transformedIngredients = ingredientKeys.map((val1, key1) => {
            const ingNum = [...Array(ingredientValues[key1])];
            const ingArray = ingNum.map((val2, key2) => {
                return <BurgerIngredient key={val1 + key2} type={val1} />;
            });
            return ingArray;
        }).reduce((acc, cur) => {
            return acc.concat(cur);
        }, []);

        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Add Some Ingredients</p>;
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default withRouter(burger);