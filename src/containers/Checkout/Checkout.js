import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// REDUX imports
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);

        // let ingredientsParam = {};
        // for (let param of query.entries()) {
        //     if (param[0] === "price") {
        //         this.setState({totalPrice: +param[1]});
        //     } else {
        //         ingredientsParam[param[0]] = +param[1];
        //     }
        // }
        // this.setState({
        //     ingredients: ingredientsParam
        // });
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancel = () => {
        this.props.history.goBack();
    }


    render() {
        let summary = <Redirect to="/" />;
        const goAway = this.props.rPurchased ? <Redirect to ="/" /> : null; 

        if (this.props.rIngredients) {
            summary = (
                <div>
                    {goAway}
                    <CheckoutSummary
                        ingredients={this.props.rIngredients}
                        checkoutContinue={this.checkoutContinue}
                        checkoutCancel={this.checkoutCancel}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        rTotalPrice: state.burger.totalPrice,
        rIngredients: state.burger.ingredients,
        rPurchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);