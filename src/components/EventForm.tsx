import React from "react";

import { Formik, Form } from "formik";

import * as Yup from "yup";

import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

import { Save } from "@mui/icons-material";

import { FormTextField } from "components/forms/TextField";
import { FormTextArea } from "components/forms/TextArea";

type EventFormProps = { handleSubmit: () => void; handleCancel: () => void };

const EventSchema = Yup.object().shape({
  eventName: Yup.string()
    .min(5, "The event name is too short")
    .max(100, "The event name is too long")
    .required("You must provide an event name")
    .default(""),
  eventDescription: Yup.string()
    .max(500, "The event description is too long")
    .optional()
    .default(""),
  eventLocation: Yup.string()
    .max(100, "The event location is too long")
    .optional()
    .default(""),
  eventDates: Yup.array()
    .of(
      Yup.object()
        .shape({
          date: Yup.date().required(),
        })
        .required()
    )
    .required()
    .default([{ date: new Date() }]),
  firstName: Yup.string()
    .max(100, "Your first name should be under 100 characters")
    .required("Your first name is required")
    .default(""),
  lastName: Yup.string()
    .max(100, "Your last name should be under 100 characters")
    .optional()
    .default(""),
});

export const EventForm = (props: EventFormProps) => {
  return (
    <>
      <Formik
        initialValues={EventSchema.getDefault()}
        validationSchema={EventSchema}
        onSubmit={(values) => console.debug(values)}
      >
        {(form) => (
          <>
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography>Create an Event</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    required
                    name="eventName"
                    label="Event Name"
                    placeholder="Birthday Party"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextArea
                    name="eventDescription"
                    label="Event Description"
                    placeholder="Everyone bring your own booze."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormTextField
                    required
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormTextField
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                  />
                </Grid>
                <Grid item xs={12}>
                  {/** Dates */}
                  {form.values.eventDates.map((value, index) => {
                    return (
                      <Typography key={index}>
                        {value.date.toString()}
                      </Typography>
                    );
                  })}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    endIcon={<Save />}
                    disabled={!form.dirty || !form.isValid}
                  >
                    Save Event
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
