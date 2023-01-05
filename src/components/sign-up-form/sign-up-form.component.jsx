import { useState } from "react";
import './sign-up-form.styles.scss'; 
import Button from "../button/button.component";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth }
from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";


const defaultFormFields = {
    displayName:'',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState({...defaultFormFields});
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (confirmPassword !== password) {
            alert('Passwords do not match');
            return;
        }
        try {
            const { user } =  await createAuthUserWithEmailAndPassword(
                email,
                password
                );

                await createUserDocumentFromAuth(user, { displayName });
                resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use!');
            } else{
                console.log('user creation encountered an error: ',error); 
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value })
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={ handleSubmit }>

                <FormInput
                    label='Display Name'
                    type='text'
                    onChange={handleChange}
                    required
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    required
                    name="email"
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    onChange={handleChange}
                    required
                    name="password"
                value={password}
                />

                <FormInput
                    label='Confirm password '
                    type='password'
                    onChange={handleChange}
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;