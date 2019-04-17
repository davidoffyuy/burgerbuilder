import React, { Suspense } from "react";
import Spinner from '../UI/Spinner/Spinner';

const compWait = Component => {
    return props => (
        <Suspense fallback={<div><Spinner /></div>}>
            <Component {...props} />
        </Suspense>
    );
};

export default compWait;