import React from "react";
import classes from "./BuildControls.module.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current Price: <strong>{props.price.toFixed(2)}</strong>
            </p>
            {controls.map(ctrls => {
                return (
                    <BuildControl
                        key={ctrls.label}
                        label={ctrls.label}
                        type={ctrls.type}
                        added={() => props.added(ctrls.type)}
                        removed={() => props.removed(ctrls.type)}
                        disabling={props.disabling[ctrls.type]}
                    />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.enableOrderButton}
                onClick={props.purchasing} 
            >
                { props.isAuth ? 'ORDER NOW' : 'LOG IN TO ORDER' }
            </button>
        </div>
    );
};

export default buildControls;
