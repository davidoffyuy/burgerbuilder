import React, { Component } from 'react';
import classes from './Auth.module.css';
import {updateObject, checkValidity} from '../../shared/utility';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';

// Routing
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        isSignup: false,
        formValid: false,
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                },
                touched: false
            }
        }
    }

    componentDidMount() {
        if (!this.props.rBuilding && this.props.rAuthRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    inputChangeHandler = (event, formElementId) => {
        // const copyAuthForm = {...this.state.authForm};
        // const copyFormElement = {...this.state.authForm[formElementId]};
        const copyFormElement = updateObject(this.state.authForm[formElementId], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.authForm[formElementId].validation)
        });
        // copyFormElement.value = event.target.value;
        // copyFormElement.touched = true;
        // if (copyFormElement.validation)
        //     copyFormElement.valid = this.checkValidity(event.target.value, copyFormElement.validation);
        // copyAuthForm[formElementId] = copyFormElement;
        const copyAuthForm = updateObject(this.state.authForm, {
            [formElementId]: copyFormElement
        });

        let formValid = true;
        for (let formElement in copyAuthForm) {
            if (copyAuthForm[formElement].validation) {
                formValid = copyAuthForm[formElement].valid && formValid;
            }
        }

        this.setState({
            authForm: copyAuthForm,
            formValid: formValid
        })
    }

    onSwitchSignupHandler = (event) => {
        event.preventDefault();
        this.setState({isSignup: !this.state.isSignup});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup);
    }

    render() {

        const authFormElementArray = [];
        for (let key in this.state.authForm) {
            authFormElementArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        let form = (
            authFormElementArray.map( formElement => {
                return (
                    <Input key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        validation={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                );
            })
        );
        if (this.props.rLoading) {
            form = <Spinner />
        };

        let errorMessage = null
        if (this.props.rError) {
            errorMessage = this.props.rError.message;
        }

        let goAway = null;
        if (this.props.isAuth) {
            goAway = <Redirect to={this.props.rAuthRedirectPath} />
        }

        return (
            <div className={classes.AuthForm}>
                {goAway}
                <form onSubmit={this.submitHandler}>
                    {errorMessage}
                    {form}
                    <Button btnType="Success">{this.state.isSignup ? 'Sign-up' : 'Authenticate'}</Button>
                    {/* <Button btnType="Success" disabled={!this.state.formValid}>Authenticate</Button> */}
                </form>
                <Button btnType="Danger" clicked={this.onSwitchSignupHandler.bind(this)}>Switch to Sign-up</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        rError: state.auth.error,
        rLoading: state.auth.loading,
        isAuth: state.auth.token !== null,
        rAuthRedirectPath: state.auth.authRedirectPath,
        rBuilding: state.burger.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);