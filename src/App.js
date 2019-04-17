import React, { Component, Suspense } from "react";
import { Route, Switch,  withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Spinner from './UI/Spinner/Spinner';

// Components
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

// Redux
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

// Lazy Load
const lazyCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const lazyOrders = React.lazy(() => import('./containers/Orders/Orders'));
const lazyAuth = React.lazy(() => import('./containers/Auth/Auth'));
const lazyLogout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthState();
    }

    render() {
        return (
            <div>
                <Suspense fallback={<div><Spinner /></div>}>
                    <Layout>
                        <Switch>
                            <Route path="/checkout" component={lazyCheckout} />
                            <Route path="/orders" component={lazyOrders} />
                            <Route path="/auth" component={lazyAuth} />
                            <Route path="/logout" component={lazyLogout} />
                            <Route path="/" exact component={BurgerBuilder} />
                        </Switch>
                    </Layout>
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(actions.checkAuthState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
