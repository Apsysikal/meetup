import React from "react";

import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

export const NotFound = () => {
  return (
    <>
      <Box>
        <Stack
          direction="column"
          alignItems="center"
          textAlign="center"
          spacing={2}
          sx={{
            pt: 10,
          }}
        >
          <Typography
            variant="h2"
            textTransform="uppercase"
            fontWeight={500}
            color="error"
          >
            Not Found
          </Typography>
          <Typography variant="body1">
            The requested location could not be found. The thing you are looking
            for might have moved or is temporary unavailable.
          </Typography>
        </Stack>
      </Box>
    </>
  );
};
