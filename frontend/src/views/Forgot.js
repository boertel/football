import React from "react";
import Header from "./Header";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";

import { FormSection, FormGroup, FormActions, Button, Error } from "../ui";
import { TextField } from "../fields";
import { forgot } from "../resources/auth";

const ForgotPasswordForm = ({ isSubmitting }) => {
  return (
    <>
      <Form
        name="forgot-password"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="space-y-large"
      >
        <FormSection>
          <h2 className="text-bold">Reset password</h2>
          <FormGroup label="Enter your email address to reset your password">
            <Field
              name="email"
              placeholder="Email address"
              component={TextField}
              autoFocus={true}
              size="medium"
            />
          </FormGroup>
          <FormActions>
            <Button type="submit" submitting={isSubmitting}>
              Request password reset
            </Button>
          </FormActions>
          <FormActions>
            <Link className="mt-medium" to="/login">
              Back
            </Link>
          </FormActions>
        </FormSection>
      </Form>
    </>
  );
};

export default () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search] = useSearchParams();

  const onSubmit = async (values) => {
    await dispatch(forgot(values));
    navigate("success");
  };
  const initialValues = {
    email: search.get("email") || state?.email,
  };
  return (
    <>
      <Header />
      <main>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          component={ForgotPasswordForm}
        />
      </main>
    </>
  );
};
