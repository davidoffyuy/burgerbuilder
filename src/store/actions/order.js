import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData).then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData,));
        }).catch( error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const userQuery = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + userQuery)
        .then( res => {
            let tempOrders = [];
            for (let orderKey in res.data) {
                tempOrders.push({
                    ...res.data[orderKey],
                    id: orderKey
                });
            }
            dispatch(fetchOrderSuccess(tempOrders));
        }).catch( error => {
            console.log("error");
            dispatch(fetchOrderFail());
        })
    }
}