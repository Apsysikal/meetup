import { useNavigate } from "@remix-run/react";

import { Button } from "~/components/Button";

export default function IndexRoute() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <div>
          <img
            src="calendar-booking.svg"
            alt="Calendar"
            className="w-full h-auto"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center">
            Welcome to{" "}
            <span className="lowercase text-emerald-700">Meetup</span>
          </h1>
          <p className="text-slate-700 text-center">
            Use our app to easily plan events with your friends. Click one of
            the buttons below to get started.
          </p>
        </div>
        <div>
          <Button onClick={() => navigate("event/new")} size="lg">
            <div className="flex flex-row gap-2 items-center">
              <p>Plan an Event</p>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
