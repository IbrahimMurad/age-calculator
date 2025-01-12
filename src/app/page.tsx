"use client";

import * as React from "react";
import { useState } from "react";
import calculateAge from "./utils/calculateAge";

interface Age {
  years: number;
  months: number;
  days: number;
}

function DateValue({ dateValue }: { dateValue: number }) {
  return <span className="text-lime-500 font-bold">{dateValue}</span>;
}

const calculate = (
  event: React.FormEvent<HTMLFormElement>,
  setAge: React.Dispatch<React.SetStateAction<Age>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setShowAge: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const birthDateValue = formData.get("birthDate")?.toString();
  if (!birthDateValue) {
    setError("Please provide a valid birth date.");
    return;
  }
  const birthDate = new Date(birthDateValue);
  try {
    setAge(calculateAge(birthDate));
    setError(null);
    setShowAge(true);
  } catch (err) {
    setShowAge(false);
    setError((err as Error).message);
  }
};

function ToggleSwitch({
  isOn,
  handleToggle,
}: {
  isOn: boolean;
  handleToggle: () => void;
}) {
  return (
    <div className="flex items-center">
      <span className="mr-2">{isOn ? "Manual Input" : "Date Picker"}</span>
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
          isOn ? "bg-fuchsia-200" : "bg-gray-300"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`bg-slate-800 w-4 h-4 rounded-full shadow-md transform ${
            isOn ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [showAge, setShowAge] = useState<boolean>(false);
  const [details, setDetails] = useState<boolean>(false);
  const [age, setAge] = useState<Age>({ years: 0, months: 0, days: 0 });
  const [serparatePickers, setSeparatePickers] = useState<boolean>(false);
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  function handleYearChange(value: number) {
    if (isNaN(value)) {
      setError("Please provide a valid number.");
      return;
    } else if (value < 0) {
      setYear(0);
    } else if (value > 9999) {
      setYear(9999);
    } else {
      setYear(value);
    }
  }

  function handleMonthChange(value: number) {
    if (isNaN(value)) {
      setError("Please provide a valid number.");
      return;
    } else if (value < 1) {
      setMonth(1);
    } else if (value > 12) {
      setMonth(12);
    } else {
      setMonth(value);
    }
  }

  function handleDayChange(value: number) {
    if (isNaN(value)) {
      setError("Please provide a valid number.");
      return;
    } else if (value < 1) {
      setDay(1);
    } else if (value > 31) {
      setDay(31);
    } else {
      setDay(value);
    }
  }

  function handleSumition(e: React.FormEvent<HTMLFormElement>) {
    if (serparatePickers) {
      e.preventDefault();
      if (year !== null && month !== null && day !== null) {
        const daysOfMonth = new Date(year, month, 0).getDate();
        if (day > daysOfMonth) {
          setShowAge(false);
          setError("Please provide valid year, month and day.");
          return;
        }
      } else {
        setShowAge(false);
        setError("Please provide valid year, month and day.");
        return;
      }
      const birthDate = new Date(year, month - 1, day);
      try {
        setAge(calculateAge(birthDate));
        setError(null);
        setShowAge(true);
      } catch (err) {
        setShowAge(false);
        setError((err as Error).message);
      }
    } else {
      calculate(e, setAge, setError, setShowAge);
    }
  }

  return (
    <main className="grid place-items-center min-h-screen w-full p-4 bg-slate-900">
      <div className="max-w-[30rem] bg-slate-700 p-8 rounded-lg">
        <h1 className="text-3xl font-bold">Age Calculator</h1>
        <p className="mt-4">
          Calculate your age today by providing your date of birth.
        </p>
        <form
          className="flex flex-col items-center mt-4"
          onSubmit={(event) => handleSumition(event)}
        >
          <label className="w-full min-w-30 ">
            <div className="flex flex-row justify-between items-center">
              <span>Date of birth:</span>
              <ToggleSwitch
                isOn={serparatePickers}
                handleToggle={() => setSeparatePickers(!serparatePickers)}
              />
            </div>
            {serparatePickers ? (
              <div className="w-full flex flex-row flex-wrap justify-center gap-x-2">
                <input
                  type="number"
                  name="day"
                  placeholder="day"
                  onChange={(e) => handleDayChange(Number(e.target.value))}
                  value={day ?? ""}
                  required
                  className="min-w-10 w-[30%] rounded-lg bg-slate-600 p-2
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
                  className="min-w-30 w-[30%] rounded-lg bg-slate-600 p-2
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
                  className="min-w-30 w-[30%] rounded-lg bg-slate-600 p-2
              border-slate-900 border focus:border-2 focus:border-slate-300
              focus:outline-none my-2
              "
                />
              </div>
            ) : (
              <input
                type="date"
                name="birthDate"
                required
                className="w-full min-w-30 rounded-lg bg-slate-600 p-2
              border-slate-900 border focus:border-2 focus:border-slate-300
              focus:outline-none my-2
              "
              />
            )}
          </label>
          <button
            type="submit"
            className="font-bold text-xl bg-slate-600 h-12 w-60 rounded-lg hover:bg-slate-500 hover:border-2 hover:border-slate-700 mt-4 mb-2"
          >
            Calculate age
          </button>
        </form>
        {error && <p className="text-red-300 font-bold">{error}</p>}

        {showAge && (
          <>
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-2xl font-bold">Your age</h2>
              <span
                className="text-amber-500 underline cursor-pointer"
                onClick={() => setDetails(!details)}
              >
                {details ? "only in years" : "show extended age"}
              </span>
            </div>
            <p className="mt-4">
              You are <DateValue dateValue={age.years} /> years
              {details && (
                <>
                  <span className="px-1">
                    <DateValue dateValue={age.months} /> months, and
                  </span>
                  <span className="px-1">
                    <DateValue dateValue={age.days} /> days
                  </span>
                </>
              )}
              <span> old.</span>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
