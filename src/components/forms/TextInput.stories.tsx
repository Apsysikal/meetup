import React from "react";

import { ComponentStory } from "@storybook/react";
import { ComponentMeta } from "@storybook/react";

import { TextInput } from "./TextInput";

export default {
  title: "Text Input",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args}></TextInput>
);

export const Basic = Template.bind({});

Basic.args = {
  placeholder: "Basic Placeholder",
};
