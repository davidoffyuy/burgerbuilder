import React, {Component} from 'react';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';

//REDUX
import {connect} from 'react-redux';

class Logout extends Component {
    state = {
        isTimedOut: false
    }

    componentDidMount() {
        this.props.onLogout();
        setTimeout(() => {
            this.setState({isTimedOut: true});
        }, 500);
    }

    render() {
        return (
            <div>
                { !this.props.isAuth && this.state.isTimedOut ? <Redirect to="/" /> : null}
                logging out
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);