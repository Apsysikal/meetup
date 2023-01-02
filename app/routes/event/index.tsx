import { Button } from "~/components/Button";
import { CustomLink } from "~/components/Link";

export default function EventIndexRoute() {
  return (
    <div className="flex h-full">
      <div className="my-auto flex flex-col gap-2 items-center">
        <p className="text-slate-700 text-center">
          Please use a link to get to an existing event or create a new one.
        </p>
        <div>
          <CustomLink to="/event/new">
            <p>Plan an Event</p>
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
