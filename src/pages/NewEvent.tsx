import React from "react";

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const CalendarDayButton = ({
  day,
  today = false,
  selected = false,
}: {
  day: string;
  today?: boolean;
  selected?: boolean;
}) => {
  let classNames =
    "text-xs font-medium text-slate-600 text-center p-1 w-7 h-7 rounded-full hover:bg-sky-500 hover:text-white";

  if (today) classNames = classNames.concat(" border-2 border-slate-300");
  if (selected) classNames = classNames.concat(" bg-sky-500 text-white");

  return (
    <>
      <button className={classNames}>{day}</button>
    </>
  );
};

export const NewEvent = () => {
  return (
    <>
      <div>
        <div className="max-w-md mx-auto my-auto">
          <div className="p-3 border border-gray-100 rounded-md shadow-md">
            <form action="post" className="flex flex-col gap-2 items-center">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="text-xs font-semibold text-slate-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="What is your event about?"
                  className="text-sm font-normal text-slate-600 border border-gray-300 rounded-md shadow-md px-2 leading-8 ring-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-slate-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  className="text-sm font-normal text-slate-600 border border-gray-300 rounded-md shadow-md px-2 leading-8 ring-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700"
                >
                  Title
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  className="text-sm font-normal text-slate-600 border border-gray-300 rounded-md shadow-md px-2 leading-8 ring-none outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-700">
                  Date
                </span>
                <div>
                  <div className="grid grid-cols-7 gap-1 items-center">
                    <div className="text-xs text-center font-normal text-slate-400">
                      M
                    </div>
                    <div className="text-xs text-center font-normal text-slate-400">
                      T
                    </div>
                    <div className="text-xs text-center font-normal text-slate-400">
                      W
                    </div>
                    <div className="text-xs text-center font-normal text-slate-400">
                      T
                    </div>
                    <div className="text-xs text-center font-normal text-slate-400">
                      F
                    </div>
                    <div className="text-xs text-center font-normal text-slate-400">
                      S
                    </div>
                    <div className="text-xs text-center font-normal text-slate-400">
                      S
                    </div>
                    <span className="col-span-7 h-1" />
                    {days.map((day) => {
                      const today = 13;
                      const selected = [1, 18, 23];

                      const isToday = day === today;
                      const isSelected = selected.includes(day);

                      return (
                        <CalendarDayButton
                          day={String(day)}
                          today={isToday}
                          selected={isSelected}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
