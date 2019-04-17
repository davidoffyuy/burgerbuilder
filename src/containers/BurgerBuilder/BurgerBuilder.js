import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummer';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// Redux Imports
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const INGREDIENT_PRICES = {
    bacon: 1,
    salad: .5,
    cheese: 1.5,
    meat: 2.5
}

export class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 5,
        enableOrderButton: false,
        enablePurchaseModal: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
        // axios.get('/ingredients.json').then( response => {
        //     this.setState({ingredients: response.data});
        // }).catch( error => {
        //     this.setState({error: true});
        // })
    }

    componentDidUpdate() {
        const ingCount = Object.values({...this.props.rIngredients});
        const ingSum = ingCount.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        if ((ingSum > 0) !== this.state.enableOrderButton) {
            this.setState({enableOrderButton: !this.state.enableOrderButton})
        }
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({enablePurchaseModal: true});
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();

        // const queryParams = []
        // for (let key in this.props.rIngredients) {
        //     queryParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.props.rIngredients[key]));
        // }
        // queryParams.push("price=" + this.props.rTotalPrice);

        // const queryParamString = queryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            // search: "?" + queryParamString
        });
    }

    cancelPurchaseHandler = () => {
        this.setState({enablePurchaseModal: false})
    }

    updatePurchaseState = (/*ingredients*/) => {
        // REDUX
        const ingCount = Object.values({...this.props.rIngredients});
        const ingSum = ingCount.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        // const ingCount = Object.values({...ingredients });
        // const ingSum = ingCount.reduce((accumulator, currentValue) => {
        //     return accumulator + currentValue;
        // }, 0);

        this.setState({
            enableOrderButton: ingSum > 0
        });
    }

    addIngredientHandler = (type) =>  {
        // REDUX
        this.props.onAddIngredient(type);
        this.props.onAddPrice(INGREDIENT_PRICES[type]);

        // // Increment ingredient count
        // const oldIngCount = this.state.ingredients[type];
        // const newIngCount = oldIngCount + 1;
        // let newIng = {...this.state.ingredients};
        // newIng[type] = newIngCount;

        // // Add to price
        // const currentPrice = this.state.totalPrice;
        // const newPrice = currentPrice + INGREDIENT_PRICES[type];

        // // Insert changes into state
        // this.setState({
        //     ingredients: newIng,
        //     totalPrice: newPrice
        // });

        //update state of Order Button
        // this.updatePurchaseState(newIng);
    }

    removeIngredientHandler = (type) => {
        if (this.props.rIngredients[type] <= 0)
            return;

        // REDUX
        this.props.onSubtractIngredient(type);
        this.props.onSubtractPrice(INGREDIENT_PRICES[type]);

        // // Decrement ingredient count
        // const oldIngCount = this.state.ingredients[type];
        // const newIngCount = oldIngCount - 1;
        // let newIng = { ...this.state.ingredients };
        // newIng[type] = newIngCount;

        // // Add to price
        // const currentPrice = this.state.totalPrice;
        // const newPrice = currentPrice - INGREDIENT_PRICES[type];

        // // Insert changes into state
        // this.setState({
        //     ingredients: newIng,
        //     totalPrice: newPrice
        // });

        //update state of Order Button
        // this.updatePurchaseState(newIng);
    }

    render() {
        // table for determining whether buttons should be disabled
        let disabledStatus = {...this.props.rIngredients};
        for (let key in disabledStatus) {
            disabledStatus[key] = disabledStatus[key] <= 0;
        }

        let modalChildren;
        if (!this.props.rIngredients) {
            modalChildren = (
                <Spinner />
            )
        }
        else {
            modalChildren = (
                <OrderSummary
                    ingredients={this.props.rIngredients}
                    cancelPurchase={this.cancelPurchaseHandler}
                    continuePurchase={this.continuePurchaseHandler}
                    price={this.props.rTotalPrice}
                />
            )
        }

        let burger;
        if (this.props.rIngredients) {
            burger = (<Auxiliary>
                <Burger ingredients={this.props.rIngredients} />
                <BuildControls
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler} 
                    disabling={disabledStatus} 
                    price={this.props.rTotalPrice}
                    enableOrderButton={this.state.enableOrderButton}
                    purchasing={this.purchaseHandler}
                    isAuth={this.props.isAuth}
                />
            </Auxiliary>)
        }
        else {
            burger = this.props.rError ? <p>Error Loading Ingredients</p> : <Spinner />;
        };

        return <Auxiliary>
                <Modal show={this.state.enablePurchaseModal} backdropClicked={this.cancelPurchaseHandler}>
                    {modalChildren}
                </Modal>
                    {burger}
            </Auxiliary>;
    }
}

const mapStateToProps = state => {
    return {
        rTotalPrice: state.burger.totalPrice,
        rIngredients: state.burger.ingredients,
        rError: state.burger.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPrice: (price) => dispatch(actions.addPrice(price)),
        onSubtractPrice: (price) => dispatch(actions.subtractPrice(price)),
        onAddIngredient: (ingType) => dispatch(actions.addIngredient(ingType)),
        onSubtractIngredient: (ingType) => dispatch(actions.subtractIngredient(ingType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.initPurchase()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);