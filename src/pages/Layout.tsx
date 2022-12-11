import React from "react";

import { Outlet } from "react-router-dom";

import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

export const Layout = () => {
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6">Meetup</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};
