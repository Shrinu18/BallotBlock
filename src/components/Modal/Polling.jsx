"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CreatePoll from "./CreatePoll";

export default function Polling({ show, onClose, uData }) {
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [pollName, setPollName] = useState("");
  const [pollDescription, setPollDescription] = useState("");

  const [options, setOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [pollDetails, setPollDetails] = useState({});

  const router = useRouter();
  if (!show) return null;

  const handleAddOption = () => {
    const newId = options.length ? options[options.length - 1].id + 1 : 1;
    setOptions([...options, { id: newId, text: "" }]);
  };

  const handleRemoveOption = (id) => {
    setOptions((prev) => prev.filter((opt) => opt.id !== id));
  };

  const handleOptionChange = (id, value) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, text: value } : opt))
    );
  };

  const getFormattedOptionsJSON = () => {
    const formatted = options.map((opt, idx) => {
      return {
        [`option${idx + 1}`]: {
          description: opt.text,
          votes: [],
          totalvotes: 0,
        },
      };
    });
    return formatted;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledOptions = options.filter((opt) => opt.text.trim() !== "");

    if (filledOptions.length < 2) {
      console.log("Please provide at least two non-empty options.");
      return;
    }

    if (!startDatetime || !endDatetime) {
      console.log("Start and end datetime must be filled.");
      return;
    }

    const toUTCISOString = (localDateStr) => {
      const date = new Date(localDateStr);
      return date.toISOString();
    };

    const pollData = {
      pollname: pollName,
      polldes: pollDescription,
      startdatetime: toUTCISOString(startDatetime),
      enddatetime: toUTCISOString(endDatetime),
      polloptions: getFormattedOptionsJSON(),
    };

    console.log("Submitting Poll:", pollData);
    setPollDetails(pollData);
    setShowCreatePoll(true); // trigger modal
  };

  return (
    <div className="overflow-x-clip">
      <div className="fixed inset-0 z-30 bg-[#0080FF75] flex items-center justify-center">
        <div className="md:container md:mx-0 mx-2 w-full md:p-8 p-4 bg-[#000000] md:rounded-4xl rounded-2xl">
          <h1 className="md:text-4xl text-2xl text-[#FFFFFF] font-bold text-center">
            Create a Poll!
          </h1>
          <form
            onSubmit={handleSubmit}
            className="mt-2 md:max-h-[70vh] max-h-[60vh] custom-scrollbar overflow-y-auto md:[&::-webkit-scrollbar]:w-1 md:[&::-webkit-scrollbar-thumb]:bg-[#007FFF] md:pr-1"
          >
            <div className="mt-2">
              <input
                type="text"
                placeholder="Poll Name"
                value={pollName}
                onChange={(e) => setPollName(e.target.value)}
                required
                className="w-full bg-[#FFFFFF] placeholder:text-[#007FFF] text-[#000000] font-medium md:px-4 px-2 py-2 rounded-xl outline-none md:text-lg text-base"
              />
            </div>
            <div className="mt-2">
              <textarea
                placeholder="Poll Description"
                value={pollDescription}
                required
                onChange={(e) => setPollDescription(e.target.value)}
                className="w-full max-h-[30vh] min-h-[14vh] bg-[#FFFFFF] placeholder:text-[#007FFF] text-[#000000] font-medium md:px-4 px-2 py-2 rounded-xl outline-none md:text-lg text-base"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 px-2">
              {/* Start Date & Time */}
              <div className="w-full relative">
                <label className="block text-sm text-white mb-1 font-medium">
                  Start Date & Time
                </label>
                <div
                  className="w-full bg-white text-black px-4 py-2 rounded-xl cursor-pointer"
                  onClick={() =>
                    document.getElementById("startDatetime").showPicker()
                  }
                >
                  <input
                    type="datetime-local"
                    id="startDatetime"
                    value={startDatetime}
                    onChange={(e) => setStartDatetime(e.target.value)}
                    className="w-full bg-transparent outline-none cursor-pointer"
                  />
                </div>
              </div>
              <div className="w-full relative">
                <label className="block text-sm text-white mb-1 font-medium">
                  End Date & Time
                </label>
                <div
                  className="w-full bg-white text-black px-4 py-2 rounded-xl cursor-pointer"
                  onClick={() =>
                    document.getElementById("endDatetime").showPicker()
                  }
                >
                  <input
                    type="datetime-local"
                    id="endDatetime"
                    min={startDatetime}
                    value={endDatetime}
                    onChange={(e) => setEndDatetime(e.target.value)}
                    className="w-full bg-transparent outline-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <h1 className="text-xl text-[#FFFFFF] font-bold px-4">
                Polling Options
              </h1>
              <button
                type="button"
                onClick={handleAddOption}
                disabled={options.length >= 16}
                className={`p-1 rounded-xl transition-all duration-300 cursor-pointer ${
                  options.length >= 16
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-[#007FFF] text-[#000000] hover:bg-[#FFFFFF]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6"
                  fill="none"
                >
                  <path
                    d="M12 8V16M16 12L8 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-2 space-y-2 px-4">
              {options.map((option, idx) => (
                <div
                  key={option.id}
                  className="mt-2 mx-4 flex items-center gap-2"
                >
                  <h1 className="text-[#FFFFFF] font-bold w-6">{idx + 1}.</h1>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(option.id, e.target.value)
                    }
                    placeholder="Option description"
                    className="w-full bg-[#FFFFFF] placeholder:text-[#007FFF] text-[#000000] font-medium md:px-4 px-2 py-2 rounded-xl outline-none md:text-lg text-base"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (options.length > 2) handleRemoveOption(option.id);
                    }}
                    disabled={options.length <= 2}
                    className={`font-bold cursor-pointer ${
                      options.length <= 2
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-500 hover:text-red-700"
                    }`}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="submit"
                  className="cursor-pointer flex items-center gap-2 bg-[#FFFFFF] text-[#000000] hover:bg-[#007FFF] px-4 py-2 rounded-2xl text-lg font-bold transition-all duration-300"
                >
                  Pay Now
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer flex items-center gap-2 bg-[#FF0000] text-[#000000] hover:bg-[#007FFF] px-4 py-2 rounded-2xl text-lg font-bold transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showCreatePoll && (
        <CreatePoll
          onClose={() => setShowCreatePoll(false)}
          show={showCreatePoll}
          pollCreateData={pollDetails}
          uData={uData}
        />
      )}
    </div>
  );
}
