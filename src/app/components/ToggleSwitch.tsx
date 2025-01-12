"use client";

import { JSX } from "react";

/**
 * ToggleSwitch component renders a toggle switch UI element.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOn - Determines if the switch is in the "on" position.
 * @param {() => void} props.handleToggle - Function to handle the toggle action.
 * @returns {JSX.Element} The rendered toggle switch component.
 */
export default function ToggleSwitch({
  isOn,
  handleToggle,
}: {
  isOn: boolean;
  handleToggle: () => void;
}): JSX.Element {
  return (
    <div className="flex items-center">
      <span className="mr-2">{isOn ? "Manual Input" : "Date Picker"}</span>
      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
          isOn ? "bg-teal-500" : "bg-gray-300"
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
