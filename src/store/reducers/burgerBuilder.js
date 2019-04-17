import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building:  false
}

const addIngredient = (state, action) => {
    // make a copy of ingredients
    let copyIngredients = Object.assign({}, state.ingredients);
    copyIngredients[action.ingType] = copyIngredients[action.ingType] + 1;
    return updateObject(state, {ingredients: copyIngredients, building: true});
}

const subtractIngredient = (state, action) => {
    // make a copy of ingredients
    let copyIngredients = Object.assign({}, state.ingredients);
    copyIngredients[action.ingType] = copyIngredients[action.ingType] - 1;
    return updateObject(state, {ingredients: copyIngredients, building: true});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRICE: return updateObject(state, {totalPrice: state.totalPrice + action.price});
        case actionTypes.SUBTRACT_PRICE: return updateObject(state, {totalPrice: state.totalPrice - action.price});
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.SUBTRACT_INGREDIENT: return subtractIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return updateObject(state, {totalPrice: 4, ingredients: action.ingredients});
        case actionTypes.INIT_INGREDIENTS_FAILED: return updateObject(state, {error: true});
        default: return state;
    }
}

export default reducer;