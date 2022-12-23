import React from 'react';

import { ComponentStory } from '@storybook/react';
import { ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["contained", "outlined", "text"],
      control: { type: "radio"}
    },
    size: {
      options: ["lg", "md", "sm"],
      control: { type: "radio"}
    },
    children: {
      defaultValue: "Button",
      control: "text"
    }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}></Button>

export const Contained = Template.bind({});

Contained.args = {
  variant: "contained",
  size: "md",
}

export const Outlined = Template.bind({});

Outlined.args = {
  variant: "outlined",
  size: "md",
}

export const Text = Template.bind({});

Text.args = {
  variant: "text",
  size: "md",
}

export const Large = Template.bind({});

Large.args = {
  variant: "contained",
  size: "lg",
}

export const Medium = Template.bind({});

Medium.args = {
  variant: "contained",
  size: "md",
}

export const Small = Template.bind({});

Small.args = {
  variant: "contained",
  size: "sm",
}