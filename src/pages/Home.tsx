import React from "react";

import { Link } from "react-router-dom";

import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

import { Event } from "@mui/icons-material";

export const Home = () => {
  return (
    <>
      <Box>
        <Stack
          direction="column"
          alignItems="center"
          textAlign="center"
          spacing={1}
        >
          <Box sx={{ width: 2 / 3 }}>
            <img
              src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?w=1800&t=st=1670784421~exp=1670785021~hmac=8c83dd7260e9734abcade277b726ae992ea2ed8264e47ceef81d52de291eb7c2"
              alt="Background"
              width="100%"
            />
          </Box>
          <Typography
            variant="h3"
            fontWeight={900}
            textTransform="uppercase"
            color="primary"
            component="div"
          >
            Welcome to meetup
          </Typography>
          <Typography variant="body1">
            Use this app to easily schedule events with your friends.
          </Typography>
          <Typography variant="body1" sx={{ pb: 1 }}>
            Hit one of the buttons below to get startetd.
          </Typography>
          <Button
            variant="contained"
            endIcon={<Event />}
            component={Link}
            to="event/new"
          >
            Create a new Event
          </Button>
          <Button component={Link} to="login">
            Sign in
          </Button>
        </Stack>
      </Box>
    </>
  );
};
