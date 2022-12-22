import React from "react";

import { Event } from "@mui/icons-material";
import { Login } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

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
          <h3 className="text-3xl font-bold text-slate-600 text-center">
            Welcome to <span className="lowercase text-sky-600">Meetup</span>
          </h3>
          <p className="text-md font-medium text-slate-600 text-center">
            Use our app to easily plan events with your friends. Click one of
            the buttons below to get started.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("event/new")}
            className="text-md font-normal uppercase text-white px-3 py-1 leading-8 bg-sky-600 rounded-md hover:bg-sky-400 active:ring active:ring-sky-400 shadow-md"
          >
            <div className="flex flex-row gap-1 items-center">
              <p>Plan an Event</p>
              <Event />
            </div>
          </button>
        </div>
        <div>
          <button
            disabled
            onClick={() => navigate("login")}
            className="text-md font-normal uppercase text-sky-600 px-3 py-1 leading-8 bg-white rounded-md border border-sky-600 shadow-md disabled:text-gray-200 disabled:border-gray-200 disabled:shadow-none"
          >
            <div className="flex flex-row gap-1 items-center">
              <p>Login</p>
              <Login />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
