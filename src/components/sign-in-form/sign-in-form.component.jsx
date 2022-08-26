import { useState } from "react";

import "./sign-in-form.styles.scss";

import {
  signInAuthUserWithEmailandPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = formFields;
    try {
      await signInAuthUserWithEmailandPassword(email, password);
      resetFormFields();
    } catch (error) {
      alert("Could not log user in", error.message);
    }
  }

  function resetFormFields() {
    setFormFields(defaultFormFields);
  }

  async function signInWithGoogle() {
    await signInWithGooglePopup();
  }

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign In w/ Google
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
