import { useState } from "react";

import {SignUpContainer} from './sign-in-form.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
}
from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";



const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState({...defaultFormFields});
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('Not user associated with this email');
                    break;
                default:
                    console.log(error)
                    break;
            }
        }
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value }) 
    };

    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={ handleSubmit }>

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
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button
                        type='button'
                        onClick={signInWithGoogle}
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                        Google sign in
                    </Button>
                </div>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm;