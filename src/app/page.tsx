"use client";

import { FormEvent, useState } from "react";
import calculateAge from "./utils/calculateAge";

export default function Home() {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [error, setError] = useState("");
  const [showAge, setShowAge] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const birthDate = new Date((target.elements[0] as HTMLInputElement).value);
    try {
      setAge(calculateAge(birthDate));
    } catch (err) {
      setError((err as Error).message);
      setShowAge(false);
      return;
    }
    setError("");
    setShowAge(true);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-slate-900">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center w-full">
        <div className="mt-10 bg-slate-800 rounded-lg shadow-lg p-8 w-full max-w-[40rem]">
          <h1 className="sm:text-4xl text-3xl text-gray-100 font-bold">
            Age Calculator
          </h1>
          <p className="text-md text-gray-200 mt-4">
            Calculate your age in years, months, and days.
          </p>
          <form
            className="flex flex-col gap-4 mt-8"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-300 font-bold">
                Date of Birth
              </span>
              <input
                type="date"
                className="rounded-lg border border-black p-2 bg-slate-700 text-gray-100 focus:ring-gray-300 focus:ring-2 focus:outline-none"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-slate-600 text-gray-200 font-bold rounded-lg p-2 focus:ring-gray-300 focus:ring-2 focus:outline-none hover:bg-slate-700 hover:text-gray-100"
            >
              Calculate Age
            </button>
          </form>
          {error && <p className="text-red-600 mt-8 font-bold">{error}</p>}
          {showAge && (
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-gray-100 font-bold">Your Age</h2>
                <span
                  className=" text-stone-400 underline cursor-pointer"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? "hide details" : "show details"}
                </span>
              </div>
              <p className="text-lg text-gray-300 mt-4">
                You are{" "}
                <span id="years" className="text-indigo-400 font-bold">
                  {age.years}
                </span>{" "}
                years{" "}
                {showDetails && (
                  <>
                    ,{" "}
                    <span id="months" className="text-indigo-400 font-bold">
                      {age.months}
                    </span>{" "}
                    months, and{" "}
                    <span id="days" className="text-indigo-400 font-bold">
                      {age.days}
                    </span>{" "}
                    days
                  </>
                )}{" "}
                old.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
