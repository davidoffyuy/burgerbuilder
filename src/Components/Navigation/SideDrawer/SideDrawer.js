import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo'
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
    let sideDrawerClass = classes.Close;
    if (props.show) {
        sideDrawerClass = classes.Open;
    }

    return (
        <Auxiliary>
            <div className={[classes.SideDrawer, sideDrawerClass].join(' ')} >
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                        <NavigationItems clicked={props.clicked}/>
                </nav>
            </div>
            <Backdrop show={props.show} clicked={props.clicked} />
        </Auxiliary>
    );
}

export default sideDrawer;