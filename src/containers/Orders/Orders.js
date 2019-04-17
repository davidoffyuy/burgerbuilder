import React, {Component} from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../Components/Order/Order';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    // state = {
    //     receivedOrders: [],
    //     fetching: true
    // };

    componentDidMount() {
        if (this.props.isAuth) {
            this.props.onFetchOrders(this.props.rToken, this.props.rUserId);
        }
        // this.setState({fetching: true});

        // axios.get('/orders.json')
        //     .then( res => {
        //         let tempOrders = [];
        //         for (let orderKey in res.data) {
        //             tempOrders.push({
        //                 ...res.data[orderKey],
        //                 id: orderKey
        //             });
        //         }
        //         this.setState({
        //             receivedOrders: tempOrders,
        //             fetching: false
        //         });
        //     }).catch( error => {
        //         console.log("error");
        //         this.setState({fetching: false});
        //     })
        // console.log("State");
        // console.log(this.state);
    }

    render() {
        let goAway = null;
        let renderedOrders = <Spinner />;

        if (!this.props.isAuth) {
            goAway = <Redirect to='/' />
        }
        else {
            if (!this.props.rLoading) {
                renderedOrders = this.props.rOrders.map( order => {
                    return (
                        <Order key={order.id} 
                            id={order.id}
                            ingredients={order.ingredients}
                            price={order.totalPrice} 
                        />
                    );
                });
            }
        }

        return (
            <div>
                {goAway}
                {renderedOrders}
            </div>
        );
    }
}

const mapStateToProps = state  => {
    return {
        rLoading: state.order.loading,
        rOrders: state.order.orders,
        rToken: state.auth.token,
        rUserId: state.auth.userId,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch  => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(Orders), axios);