import React from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";

import { FormSection, FormGroup, FormActions, Button, Error } from "../ui";

import { TextField } from "../fields";

import { login } from "../resources/auth";

const LoginForm = ({ values, status, isSubmitting, errors }) => {
  return (
    <Form>
      <FormSection>
        <FormGroup label="Email Address">
          <Field name="email" component={TextField} required={true} />
        </FormGroup>
        <FormGroup label="Password">
          <Field
            name="password"
            component={TextField}
            type="password"
            required={true}
          />
        </FormGroup>
        <FormActions>
          <Button type="submit" submitting={isSubmitting}>
            Login
          </Button>
        </FormActions>
        {errors.non_field_errors && <Error>{errors.non_field_errors}</Error>}
      </FormSection>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "16px", marginTop: "16px" }}>
          <Link to="/forgot" state={{ email: values.email }}>
            Forgot my password?
          </Link>
        </div>
        <div>
          or <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </Form>
  );
};

export default function Login(props) {
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  return (
    <>
      <Header />
      <main>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
            dispatch(login(values))
              .then((response) => {
                if (response.data.ok !== false) {
                  setSubmitting(false);
                  const next =
                    searchParams.get("next") || "/euro-2021/dashboard";
                  navigate(next);
                } else {
                  setErrors({
                    form:
                      "Email Address and/or Password are incorrect. Please try again.",
                  });
                  setSubmitting(false);
                }
              })
              .catch((exception) => {
                const { data, headers } = exception.response;
                if (headers["content-type"] === "application/json") {
                  // For "errors/status" to persist use - setStatus(data)
                  setStatus({});
                  setErrors(data);
                } else if (
                  headers["content-type"].startsWith(
                    "text/plain; charset=utf-8"
                  )
                ) {
                  setStatus({ message: exception.message });
                } else {
                  setStatus({ message: "An error occured." });
                }
              });
          }}
          component={LoginForm}
        />
      </main>
    </>
  );
}
