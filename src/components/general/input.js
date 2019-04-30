import React from 'react';

export default ({ input, id, meta: { error, touched }, type = 'text',
    col = 'sm-12',
    placeholder }) => {

    return (
        <div className={`input-field`}>
            <input className="inputFields" {...input} id={id} type={type} placeholder={placeholder} />
            <p className="red-text text-darken-2">{touched && error && <span>{error}</span>}</p>
        </div>
    );
}