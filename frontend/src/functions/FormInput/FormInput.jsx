import React, { useState } from "react";

import '../ContactForm/m-contact-form.css'
import '../ContactForm/d-contact-form.css'


const FormInput = (props) => {
    const { label, focused, errorMessage,errorName, onChange, id, ...inputProps } = props;

    return (
        <div className="form-group">
            <label htmlFor={inputProps.name}>
                {label}
            </label>
            {
                inputProps.name !== 'message' ?
                    <input
                        {...inputProps}
                        onChange={onChange}
                        className="form-control"

                    />
                    :
                    <textarea
                        {...inputProps}
                        rows='4'
                        cols='50'
                        maxLength={500}
                        onChange={onChange}
                        className="form-control"

                    />
            }
            {
                errorMessage && errorMessage?.map((error, index) => (
                    <span key={index} className={`error-message`}>
                        {error}
                    </span>
                ))
            }

        </div>
    );
};

export default FormInput;
