"use client";

import Age from "@/app/types/index";
import { JSX } from "react";

/**
 * A React functional component that displays the age in years, and optionally in months and days if detailed view is enabled.
 *
 * @param {Object} props - The properties object.
 * @param {Age} props.age - The age object containing years, months, and days.
 * @param {boolean} props.detailed - A boolean flag to determine if the detailed age (months and days) should be displayed.
 * @returns {JSX.Element} A paragraph element displaying the age.
 */

export default function Result({
  age,
  detailed,
}: {
  age: Age;
  detailed: boolean;
}): JSX.Element {
  return (
    <p className="mt-4">
      <span>You are </span>
      <span className="text-lime-500 font-bold">{age.years}</span>
      <span> years</span>
      {detailed && (
        <>
          <span>, </span>
          <span className="text-lime-500 font-bold">{age.months}</span>
          <span> months, and </span>
          <span className="text-lime-500 font-bold">{age.days}</span>
          <span> days</span>
        </>
      )}
      <span> old.</span>
    </p>
  );
}
