import { useState } from "react";

export default function AddCalories({ onAdd }) {
  const [showInput, setShowInput] = useState(false);
  const [calorieInput, setCalorieInput] = useState("");

  const handleAddCalories = () => {
    const value = Number(calorieInput);
    if (!isNaN(value) && value > 0) {
      onAdd(value);
      setCalorieInput("");
      setShowInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <button onClick={() => setShowInput((prev) => !prev)}>
        + Add Calories
      </button>

      {showInput && (
        <div className="space-x-2 mt-2">
          <input
            type="number"
            value={calorieInput}
            onChange={(e) => setCalorieInput(e.target.value)}
            placeholder="Enter calories"
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddCalories}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
