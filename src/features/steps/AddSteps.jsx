import { useState } from "react";

export default function AddSteps({ onAdd }) {
  const [showInput, setShowInput] = useState(false);
  const [stepInput, setStepInput] = useState("");

  const handleAddSteps = () => {
    const value = Number(stepInput);
    if (!isNaN(value) && value > 0) {
      onAdd(value);
      setStepInput("");
      setShowInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <button onClick={() => setShowInput((prev) => !prev)}>+ Add Steps</button>

      {showInput && (
        <div className="space-x-2 mt-2">
          <input
            type="number"
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            placeholder="Enter steps"
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddSteps}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
