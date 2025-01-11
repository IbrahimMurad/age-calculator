"use client";

import React, { useState } from "react";
import calculateAge from "./utils/calculateAge";

function DateValue({ dateValue }: { dateValue: number }) {
  return <span className="text-indigo-500 font-bold">{dateValue}</span>;
}

export default function Home() {
  const [error, setError] = useState("");
  const [showAge, setShowAge] = useState<boolean>(false);
  const [details, setDetails] = useState<boolean>(false);
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const calculate = (formData: FormData) => {
    const birthDateValue = formData.get("birthDate")?.toString();
    if (!birthDateValue) {
      setError("Please provide a valid birth date.");
      return;
    }
    const birthDate = new Date(birthDateValue);
    try {
      setAge(calculateAge(birthDate));
      setError("");
      setShowAge(true);
    } catch (err) {
      setShowAge(false);
      setError((err as Error).message);
    }
  };

  return (
    <main className="grid place-items-center min-h-screen w-full p-2 bg-slate-900">
      <div className="w-full max-w-[40rem] bg-slate-700 p-8 rounded-lg">
        <h1 className="text-3xl font-bold">Age Calculator</h1>
        <p className="mt-4">
          Calculate you age today by providing you date of birth.
        </p>
        <form
          className="my-8 flex justify-center items-center flex-col"
          action={calculate}
        >
          <input
            type="date"
            name="birthDate"
            required
            className="w-full rounded-lg bg-slate-500 p-2
              border-slate-900 border focus:border-2 focus:border-slate-300
              focus:outline-none my-4
              "
          />
          <button
            type="submit"
            className="font-bold text-xl bg-slate-600 p-4 max-w-full w-80 rounded-lg hover:bg-slate-500 hover:border-2 hover:border-slate-700 my-2 h-16"
          >
            Calculate age
          </button>
        </form>
        {error && <p className="text-red-700 font-bold">{error}</p>}
        {showAge && (
          <>
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-2xl font-bold">Your age</h2>
              <span
                className="text-slate-500 underline cursor-pointer"
                onClick={() => setDetails(!details)}
              >
                {details ? "collapse" : "extend"}
              </span>
            </div>
            <p className="mt-4">
              You are <DateValue dateValue={age.years} /> years
              {details && (
                <>
                  {" "}
                  <DateValue dateValue={age.months} /> month, and{" "}
                  <DateValue dateValue={age.days} /> days
                </>
              )}{" "}
              old.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
