import type { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  stat: string;
  statDescription?: string;
};

export const StatsCard = ({ title, stat, statDescription }: StatsCardProps) => {
  return (
    <section className="flex flex-col gap-1 border border-gray-50 shadow-lg rounded-lg p-5 text-gray-700 w-full h-full">
      <p className="text-lg font-bold">{title}</p>
      <p>
        <span className="text-emerald-700 font-semibold">{stat}</span>{" "}
        {statDescription}
      </p>
    </section>
  );
};
