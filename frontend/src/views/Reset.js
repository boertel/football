import React from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";

import { FormSection, FormGroup, FormActions, Button, Error } from "../ui";

import { TextField } from "../fields";

import { reset } from "../resources/auth";

const ResetForm = ({ isSubmitting, errors }) => {
  return (
    <Form>
      <Field type="hidden" name="uid" />
      <Field type="hidden" name="token" />
      <FormSection>
        {errors.form && <Error>{errors.form}</Error>}
        <FormGroup label="Enter new password">
          <Field
            name="new_password1"
            component={TextField}
            type="password"
            autoComplete="new-password"
            required={true}
          />
        </FormGroup>
        <FormGroup label="Confirm new password">
          <Field
            name="new_password2"
            component={TextField}
            type="password"
            autoComplete="off"
            required={true}
          />
        </FormGroup>
        <FormActions>
          <Button type="submit" submitting={isSubmitting}>
            Done
          </Button>
        </FormActions>
      </FormSection>
    </Form>
  );
};

export default function Reset(props) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams({ uid: "", token: "" });
  const navigate = useNavigate();
  const initialValues = {
    new_password1: "",
    new_password2: "",
    uid: searchParams.get("uid"),
    token: searchParams.get("token"),
  };

  return (
    <>
      <Header />
      <main>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            dispatch(reset(values))
              .then(() => {
                navigate("/login");
              })
              .catch((errors) => {
                setErrors(errors?.response?.data);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
          component={ResetForm}
        />
      </main>
    </>
  );
}
