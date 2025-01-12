"use client";

import { useState, JSX } from "react";

export function DefaultDatePicker(): JSX.Element {
  return (
    <input
      type="date"
      name="birthDate"
      required
      className="w-full min-w-30 rounded-lg bg-slate-600 p-2
			border-slate-900 border focus:border-2 focus:border-slate-300
			focus:outline-none my-2"
    />
  );
}

export function CustomDatePicker(): JSX.Element {
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  function handleYearChange(value: number): void {
    if (isNaN(value)) {
      setYear(null);
    } else if (value < 0) {
      setYear(0);
    } else if (value > 9999) {
      setYear(9999);
    } else {
      setYear(value);
    }
  }

  function handleMonthChange(value: number): void {
    if (isNaN(value)) {
      setMonth(null);
    } else if (value < 1) {
      setMonth(1);
    } else if (value > 12) {
      setMonth(12);
    } else {
      setMonth(value);
    }
  }

  function handleDayChange(value: number): void {
    if (isNaN(value)) {
      setDay(null);
    } else if (value < 1) {
      setDay(1);
    } else if (value > 31) {
      setDay(31);
    } else {
      setDay(value);
    }
  }

  return (
    <div className="w-full min-w-30 flex flex-row flex-wrap justify-center gap-x-2">
      <input
        type="number"
        name="day"
        placeholder="day"
        onChange={(e) => handleDayChange(Number(e.target.value))}
        value={day ?? ""}
        required
        className="min-w-28 w-[30%] rounded-lg bg-slate-600 p-2
              border-slate-900 border focus:border-2 focus:border-slate-300
              focus:outline-none my-2
              "
      />
      <input
        type="number"
        name="month"
        placeholder="month"
        onChange={(e) => handleMonthChange(Number(e.target.value))}
        value={month ?? ""}
        required
        className="min-w-28 w-[30%] rounded-lg bg-slate-600 p-2
              border-slate-900 border focus:border-2 focus:border-slate-300
              focus:outline-none my-2
              "
      />
      <input
        type="number"
        name="year"
        placeholder="year"
        onChange={(e) => handleYearChange(Number(e.target.value))}
        value={year ?? ""}
        required
        className="min-w-28 w-[30%] rounded-lg bg-slate-600 p-2
              border-slate-900 border focus:border-2 focus:border-slate-300
              focus:outline-none my-2
              "
      />
    </div>
  );
}
