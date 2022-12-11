import React from "react";

import { Box } from "@mui/material";

import { EventForm } from "components/EventForm";

export const NewEvent = () => {
  return (
    <>
      <Box>
        <EventForm
          handleSubmit={() => console.debug("Submit")}
          handleCancel={() => console.debug("Cancel")}
        />
      </Box>
    </>
  );
};
