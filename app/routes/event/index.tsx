import { useNavigate } from "@remix-run/react";

import { Button } from "~/components/Button";

export default function EventIndexRoute() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full">
      <div className="my-auto flex flex-col gap-2 items-center">
        <p className="text-slate-700 text-center">
          Please use a link to get to an existing event or create a new one.
        </p>
        <div className="shrink">
          <Button onClick={() => navigate("/event/new")}>
            <p>Plan an Event</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
