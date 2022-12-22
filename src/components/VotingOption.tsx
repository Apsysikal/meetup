import React from "react";

import { format as formatDate } from "date-fns";

import { RemoveCircle } from "@mui/icons-material";

type VotingOptionProps = {
  meeting: Date;
  onRemoveClick: (meeting: Date) => void;
};

export const VotingOption = ({ meeting, onRemoveClick }: VotingOptionProps) => {
  return (
    <div className="w-full flex flex-row p-2 border border-sky-600 rounded-md shadow-md items-center">
      <input
        type="datetime"
        hidden
        name="dates"
        defaultValue={meeting.toISOString()}
      />
      <time
        dateTime={formatDate(meeting, "yyyy-MM-dd-HH-mm")}
        className="text-xs font-medium flex flex-row w-full text-slate-700"
      >
        {formatDate(meeting, "dd MMMM yyyy HH:mm")}
      </time>
      <button
        type="button"
        onClick={() => onRemoveClick(meeting)}
        className="flex text-slate-700 hover:text-red-500"
      >
        <RemoveCircle fontSize="inherit" />
      </button>
    </div>
  );
};