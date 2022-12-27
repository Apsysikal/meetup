import React from "react";

import { ComponentStory } from "@storybook/react";
import { ComponentMeta } from "@storybook/react";

import { TimeInput } from "./TimeInput";

export default {
  title: "Time Input",
  component: TimeInput,
} as ComponentMeta<typeof TimeInput>;

const Template: ComponentStory<typeof TimeInput> = (args) => (
  <TimeInput {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  id: "event-time",
  name: "event-time",
  label: "Event Time",
};
