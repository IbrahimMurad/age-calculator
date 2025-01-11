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

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [showAge, setShowAge] = useState<boolean>(false);
  const [details, setDetails] = useState<boolean>(false);
  const [age, setAge] = useState<Age>({ years: 0, months: 0, days: 0 });

  return (
    <main className="grid place-items-center min-h-screen w-full p-4 bg-slate-900">
      <div className="max-w-[40rem] bg-slate-700 p-8 rounded-lg">
        <h1 className="text-3xl font-bold">Age Calculator</h1>
        <p className="mt-4">
          Calculate your age today by providing your date of birth.
        </p>
        <form
          className="flex flex-col items-center mt-4"
          onSubmit={(event) => calculate(event, setAge, setError, setShowAge)}
        >
          <label className="w-full min-w-30 ">
            Date of birth:
            <input
              type="date"
              name="birthDate"
              required
              className="w-full min-w-30 rounded-lg bg-slate-600 p-2
              border-slate-900 border focus:border-2 focus:border-slate-300
              focus:outline-none my-2
              "
            />
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
                {details ? "collapse" : "extend"}
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
