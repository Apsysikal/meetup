import React from "react";

import { ComponentStory } from "@storybook/react";
import { ComponentMeta } from "@storybook/react";

import { add as addDate } from "date-fns";

import { ResultsTable } from "./ResultsTable";

export default {
  title: "Results Table",
  component: ResultsTable,
} as ComponentMeta<typeof ResultsTable>;

const Template: ComponentStory<typeof ResultsTable> = (args) => (
  <ResultsTable {...args}></ResultsTable>
);

const currentDate = new Date();

export const Empty = Template.bind({});

Empty.args = {
  meeting: {
    id: "",
    title: "Meeting",
    creator: "John Doe",
    creatorEmail: "",
    dates: [
      currentDate.toISOString(),
      addDate(currentDate, { days: 1 }).toISOString(),
      addDate(currentDate, { days: 2 }).toISOString(),
      addDate(currentDate, { days: 3 }).toISOString(),
    ],
    createdOn: currentDate.toISOString(),
    modifiedAt: currentDate.toISOString(),
  },
  responses: [],
};

export const FilledOut = Template.bind({});

FilledOut.args = {
  meeting: {
    id: "",
    title: "Meeting",
    creator: "John Doe",
    creatorEmail: "",
    dates: [
      currentDate.toISOString(),
      addDate(currentDate, { days: 1 }).toISOString(),
      addDate(currentDate, { days: 2 }).toISOString(),
      addDate(currentDate, { days: 3 }).toISOString(),
    ],
    createdOn: currentDate.toISOString(),
    modifiedAt: currentDate.toISOString(),
  },
  responses: [
    {
      id: "",
      name: "John Doe",
      dates: [
        currentDate.toISOString(),
        addDate(currentDate, { days: 1 }).toISOString(),
        addDate(currentDate, { days: 2 }).toISOString(),
      ],
      meetingId: "",
      createdOn: currentDate.toISOString(),
      modifiedAt: currentDate.toISOString(),
    },
    {
      id: "",
      name: "Jane Doe",
      dates: [
        currentDate.toISOString(),
        addDate(currentDate, { days: 2 }).toISOString(),
        addDate(currentDate, { days: 3 }).toISOString(),
      ],
      meetingId: "",
      createdOn: currentDate.toISOString(),
      modifiedAt: currentDate.toISOString(),
    },
  ],
};
