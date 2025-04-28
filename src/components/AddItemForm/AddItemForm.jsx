import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddItemForm.css';

const AddItemForm = ({ onSubmit, fields, initialValues, validationSchema }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="add-item-form">
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              <Field
                type={field.type || 'text'}
                name={field.name}
                id={field.name}
                className="form-control"
              />
              <ErrorMessage name={field.name} component="div" className="error-message" />
            </div>
          ))}
          <button type="submit" disabled={isSubmitting} className="submit-button">
            Добавить
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddItemForm;