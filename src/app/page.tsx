"use client";

import { useState, JSX } from "react";
import calculateAge from "./utils/calculateAge";
import Result from "./components/Result";
import ToggleSwitch from "./components/ToggleSwitch";
import Age from "@/app/types/index";
import getDateFromForm from "@/app/services/getDateFromForm";
import { CustomDatePicker, DefaultDatePicker } from "./components/DatePicker";

export default function Home(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [showAge, setShowAge] = useState<boolean>(false);
  const [detailed, setDetailed] = useState<boolean>(false);
  const initialAge: Age = { years: 0, months: 0, days: 0 };
  const [age, setAge] = useState<Age>(initialAge);
  const [separatePickers, setSeparatePickers] = useState<boolean>(false);

  function handleSubmission(e: React.FormEvent<HTMLFormElement>): void {
    try {
      e.preventDefault();
      const date = getDateFromForm(e.currentTarget, separatePickers);
      if (!date) {
        setError("Please provide a valid birth date.");
        setShowAge(false);
        return;
      }
      const birthDate = new Date(date);
      if (isNaN(birthDate.getTime())) {
        setError("Invalid date format.");
        setShowAge(false);
        return;
      }

      // The following check is for the cases where the days of the month are less than the days provided by the user.
      // In case you do not know, if you provided 31st of February, it will be converted to 3rd of March.
      // This check is only necessary when the user provides the date in separate pickers
      if (Number(date.split("-")[1]) !== birthDate.getMonth() + 1) {
        setError("Invalid date.");
        setShowAge(false);
        return;
      }
      setAge(calculateAge(birthDate));
      setError(null);
      setShowAge(true);
    } catch {
      setError("An error occurred. Please try again.");
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
          onSubmit={(event) => handleSubmission(event)}
        >
          <label className="w-full min-w-30 ">
            <div className="flex flex-row justify-between items-center">
              <span>Date of birth:</span>
              <ToggleSwitch
                isOn={separatePickers}
                handleToggle={() => setSeparatePickers(!separatePickers)}
              />
            </div>
            {separatePickers ? <CustomDatePicker /> : <DefaultDatePicker />}
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
                onClick={() => setDetailed(!detailed)}
              >
                {detailed ? "only in years" : "show extended age"}
              </span>
            </div>
            <Result age={age} detailed={detailed} />
          </>
        )}
      </div>
    </main>
  );
}
