import { useState } from "react";

export default function AddSleep({ onAdd }) {
  const [showInput, setShowInput] = useState(false);
  const [sleepInput, setSleepInput] = useState("");

  const handleAddSleep = () => {
    const value = Number(sleepInput);
    if (!isNaN(value) && value > 0) {
      onAdd(value);
      setSleepInput("");
      setShowInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <button onClick={() => setShowInput((prev) => !prev)}>+ Add Sleep</button>

      {showInput && (
        <div className="space-x-2 mt-2">
          <input
            type="number"
            value={sleepInput}
            onChange={(e) => setSleepInput(e.target.value)}
            placeholder="Enter sleep (hrs)"
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddSleep}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
