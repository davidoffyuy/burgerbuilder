import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.validation && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = (<p className={classes.ValidationError}>Validation Error!</p>);
    }


    switch(props.elementType) {
        case 'input':
            inputElement = <input 
                    className={inputClasses.join(' ')} 
                    value={props.value} 
                    {...props.elementConfig}
                    onChange={props.changed} 
                />;
            break;
        case 'textarea':
            inputElement = <textarea
                    className={inputClasses.join(' ')}
                    value={props.value}
                    {...props.elementConfig}
                    onChange={props.changed} 
                />;
            break;
        case 'select':
            inputElement = (<select 
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map( option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        )
                        )}
                </select>);
            break;    
        default:
            inputElement = <input className={classes.InputElement} value={props.value} {...props.elementConfig} />;
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );

}

export default input;