import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <div className="flex flex-col gap-3 items-center ">
        <div className="my-10">
          <img alt="Calendar" className="w-full h-auto" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-slate-700 text-center">
            Welcome to{" "}
            <span className="lowercase text-primary-700">Meetup</span>
          </h1>
          <p className="text-md font-medium text-slate-600 text-center">
            Use our app to easily plan events with your friends. Click one of
            the buttons below to get started.
          </p>
        </div>
        <div>
          <Link to="event/new">
            <div className="flex flex-row gap-2 items-center">
              <p>Plan an Event</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
