import { format as formatDate } from "date-fns";

import { IconMinusCircle } from "~/components/icons/MinusCircle";

type VotingOptionProps = {
  meeting: Date;
  onRemoveClick: (meeting: Date) => void;
};

export const VotingOption = ({ meeting, onRemoveClick }: VotingOptionProps) => {
  return (
    <div className="w-full flex flex-row p-2 border border-primary-700 rounded-md shadow-md items-center bg-white">
      <input
        type="datetime"
        hidden
        name="dates"
        defaultValue={meeting.toISOString()}
      />
      <time
        dateTime={formatDate(meeting, "yyyy-MM-dd-HH-mm")}
        className="font-medium flex flex-row w-full text-slate-700"
      >
        {formatDate(meeting, "dd MMMM yyyy HH:mm")}
      </time>
      <button
        type="button"
        onClick={() => onRemoveClick(meeting)}
        className="flex overflow-hidden"
      >
        <span className="sr-only">Remove Voting Option</span>
        <IconMinusCircle className="h-5 w-5 text-slate-700 hover:text-red-500" />
      </button>
    </div>
  );
};
