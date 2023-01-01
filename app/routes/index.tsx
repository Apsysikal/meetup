import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <div>
        <div>
          <img alt="Calendar" />
        </div>
        <div>
          <h1>
            Welcome to <span>Meetup</span>
          </h1>
          <p>
            Use our app to easily plan events with your friends. Click one of
            the buttons below to get started.
          </p>
        </div>
        <div>
          <Link to="event/new">
            <div>
              <p>Plan an Event</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
