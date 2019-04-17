import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return ({showSideDrawer: true});
       });
    }

    render() {
        return(
            <Auxiliary>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    toggleSideDrawer={this.toggleSideDrawerHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuth}
                    show={this.state.showSideDrawer}
                    clicked={this.closeSideDrawerHandler} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);