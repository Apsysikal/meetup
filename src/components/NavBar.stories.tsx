import React from "react";

import { ComponentStory } from "@storybook/react";
import { ComponentMeta } from "@storybook/react";

import { MemoryRouter } from "react-router-dom";

import { NavBar } from "./NavBar";
import { NavLink } from "./NavLink";

export default {
  title: "Navigation Bar",
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => (
  <MemoryRouter>
    <NavBar {...args}>{args.children}</NavBar>
  </MemoryRouter>
);

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <>
      <NavLink to="/" label="Home" />
      <NavLink to="/event/new" label="New Event" />
    </>
  ),
};
