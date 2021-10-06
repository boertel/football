import React from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";

import { FormSection, FormGroup, FormActions, Button } from "../ui";

import { TextField } from "../fields";

import { signup } from "../resources/auth";

const SignupForm = ({ values, isSubmitting }) => {
  return (
    <Form>
      <FormSection>
        <FormGroup
          label="Full name"
          hint="it will help your friends to find you."
        >
          <Field name="full_name" component={TextField} required={true} />
        </FormGroup>
        <FormGroup label="Email Address">
          <Field name="email" component={TextField} required={true} />
        </FormGroup>
        <FormGroup label="Password" hint="8 characters minimum">
          <Field
            name="password1"
            component={TextField}
            type="password"
            required={true}
          />
        </FormGroup>
        <FormGroup label="Confirm Password">
          <Field
            name="password2"
            component={TextField}
            type="password"
            required={true}
          />
        </FormGroup>
        <FormActions>
          <Button type="submit" submitting={isSubmitting}>
            Signup
          </Button>
        </FormActions>
      </FormSection>
      <div>
        <Link to="/login">Already have an account?</Link>
      </div>
    </Form>
  );
};

const validate = (values) => {
  const errors = {};
  if (values.password1.length < 6) {
    errors.password1 = "Password need to be at least 6 characters long.";
  }
  if (
    values.password2.length &&
    values.password1.length &&
    values.password1 !== values.password2
  ) {
    errors.password2 = "Confirmation password must match password.";
  }
  return errors;
};

export default function Signup(props) {
  const initialValues = {
    full_name: "",
    email: "",
    password1: "",
    password2: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    dispatch(signup(values))
      .then((response) => {
        navigate("/euro-2021/dashboard");
      })
      .catch((error) => {
        setErrors(error.response.data);
        setSubmitting(false);
      });
  };
  return (
    <>
      <Header />
      <main>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          component={SignupForm}
        />
      </main>
    </>
  );
}
