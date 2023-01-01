import { Link } from "@remix-run/react";

export default function EventIndexRoute() {
  return (
    <>
      <p>Please use a link to get to an existing event or create a new one</p>
      <Link to="new">New Event</Link>
    </>
  );
}
