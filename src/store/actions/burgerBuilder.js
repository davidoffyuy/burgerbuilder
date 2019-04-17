import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addPrice = (price) => {
    return {
        type: actionTypes.ADD_PRICE,
        price: price
    }
}

export const subtractPrice = (price) => {
    return {
        type: actionTypes.SUBTRACT_PRICE,
        price: price
    }
}

export const addIngredient = (ingType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingType: ingType
    }
}

export const subtractIngredient = (ingType) => {
    return {
        type: actionTypes.SUBTRACT_INGREDIENT,
        ingType: ingType
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return (dispatch, state) => {
        axios.get('/ingredients.json').then( response => {
            const ingredientCopy = {
                salad: response.data.salad,
                bacon: response.data.bacon,
                cheese: response.data.cheese,
                meat: response.data.meat
            };
            dispatch(setIngredients(ingredientCopy));
        }).catch( error => {
            console.log("ERROR: failed to get ingredients");
            dispatch(initIngredientsFailed());
        })
    }
}

export const  initIngredientsFailed = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_FAILED
    }
}