import React from 'react';

import { ComponentStory } from '@storybook/react';
import { ComponentMeta } from '@storybook/react';

import { add as addDate } from "date-fns";

import { Calendar } from './Calendar';

export default {
  title: "Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />

export const Empty = Template.bind({});

Empty.args = {
    selectedDates: [],
    meetings: [],
}

export const SingleDateSelected = Template.bind({});

SingleDateSelected.args = {
    selectedDates: [
        new Date(),
    ],
    meetings: [],
}

export const MultipleDatesSelected = Template.bind({});

MultipleDatesSelected.args = {
    selectedDates: [
        new Date(),
        addDate(new Date(), { days: 1}),
        addDate(new Date(), { days: 2}),
        addDate(new Date(), { days: 3}),
        addDate(new Date(), { weeks: 1}),
        addDate(new Date(), { weeks: 2}),
        addDate(new Date(), { weeks: 3}),
        addDate(new Date(), { weeks: 4}),
    ],
    meetings: [],
}

export const SingleMeeting = Template.bind({});

SingleMeeting.args = {
    selectedDates: [],
    meetings: [
        new Date()
    ],
}

export const MultipleMeetings = Template.bind({});

MultipleMeetings.args = {
    selectedDates: [],
    meetings: [
        new Date(),
        addDate(new Date(), { days: 1}),
        addDate(new Date(), { days: 2}),
        addDate(new Date(), { days: 3}),
        addDate(new Date(), { weeks: 1}),
        addDate(new Date(), { weeks: 2}),
        addDate(new Date(), { weeks: 3}),
        addDate(new Date(), { weeks: 4}),
    ],
}