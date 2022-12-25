import React from 'react';

import { ComponentStory } from '@storybook/react';
import { ComponentMeta } from '@storybook/react';

import { VotingOption } from './VotingOption';

export default {
  title: "Voting Option",
  component: VotingOption,
} as ComponentMeta<typeof VotingOption>;

const Template: ComponentStory<typeof VotingOption> = (args) => <VotingOption {...args} />

export const Basic = Template.bind({});

Basic.args = {
    meeting: new Date()
}