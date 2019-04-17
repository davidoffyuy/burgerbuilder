import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItem = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/" active clicked={props.clicked}>Burger Builder</NavigationItem>
            { props.isAuth 
                ? <NavigationItem link="/orders" clicked={props.clicked}>Orders</NavigationItem>
                : null
            }
            { props.isAuth
                ? <NavigationItem link="/logout" clicked={props.clicked}>Logout</NavigationItem>
                : <NavigationItem link="/auth" clicked={props.clicked}>Authenticate</NavigationItem>
            }
        </ul>
    );
}

export default navigationItem;