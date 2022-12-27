import React from "react";

import { CalendarIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

import { Button } from "components/Button";

import { ReactComponent as CalendarImage } from "assets/calendar-booking.svg";

import "index.css";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-3 items-center ">
        <div className="my-10">
          <CalendarImage className="w-full h-auto" />
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
          <Button onClick={() => navigate("event/new")} size="lg">
            <div className="flex flex-row gap-2 items-center">
              <p>Plan an Event</p>
              <CalendarIcon className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};
