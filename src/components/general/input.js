import React from 'react';

export default ({ input, id, label, meta: { error, touched }, type = 'text', col = 's12' }) => {

    return (
        <div className={`input-field col ${col}`}>
            <input {...input} id={id} type={type} />
            <label htmlFor={id}>{label}</label>
            <p className="red-text text-darken-2">{touched && error}</p>
        </div>
    );
}