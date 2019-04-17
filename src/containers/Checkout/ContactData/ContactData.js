import React, {Component} from 'react';
import Button from '../../../UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidity} from '../../../shared/utility';

//Redux
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        formValid: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                touched: false
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },            
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                touched: false
            }
        }
    }

    inputChangeHandler = (event, formElementId) => {
        // const copyOrderForm = {...this.state.orderForm};
        const copyFormElement = updateObject(this.state.orderForm[formElementId], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm[formElementId].validation)
        });
        // const copyFormElement = {...this.state.orderForm[formElementId]};
        // copyFormElement.value = event.target.value;
        // copyFormElement.touched = true;
        // if (copyFormElement.validation)
        //     copyFormElement.valid = this.checkValidity(event.target.value, copyFormElement.validation);

        const copyOrderForm = updateObject(this.state.orderForm, {
            [formElementId]: copyFormElement
        });

        // copyOrderForm[formElementId] = copyFormElement;

        let formValid = true;
        for (let formElement in copyOrderForm) {
            if (copyOrderForm[formElement].validation) {
                formValid = copyOrderForm[formElement].valid && formValid;
            }
        }

        this.setState({
            orderForm: copyOrderForm,
            formValid: formValid
        })
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const orderData = {
            userId: this.props.rUserId,
            ingredients: this.props.rIngredients,
            totalPrice: this.props.rTotalPrice,
            formData: formData
        };

        this.props.onPurchaseBurger(orderData, this.props.rToken);

        // axios.post('/orders.json', orderData).then( response => {
        //     console.log(response);
        //     this.setState({loading: false});
        //     this.props.history.push('/');
        // }).catch( error => {
        //     console.log(error);
        //     this.setState({loading: false});
        // });
    }

    render() {

        const orderFormElementArray = [];
        for (let key in this.state.orderForm) {
            orderFormElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {orderFormElementArray.map( formElement => {
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
                })}
                <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
            </form>
        )
        if (this.props.rLoading === true) {
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        rTotalPrice: state.burger.totalPrice,
        rIngredients: state.burger.ingredients,
        rLoading: state.order.loading,
        rToken: state.auth.token,
        rUserId: state.auth.userId
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));