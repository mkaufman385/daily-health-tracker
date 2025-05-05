import { useState } from "react";

export default function AddWater({ onAdd }) {
  const [showInput, setShowInput] = useState(false);
  const [waterInput, setWaterInput] = useState("");

  const handleAddWater = () => {
    const value = Number(waterInput);
    if (!isNaN(value) && value > 0) {
      onAdd(value);
      setWaterInput("");
      setShowInput(false);
    }
  };

  return (
    <div className="space-y-2">
      <button onClick={() => setShowInput((prev) => !prev)}>+ Add Water</button>

      {showInput && (
        <div className="space-x-2 mt-2">
          <input
            type="number"
            value={waterInput}
            onChange={(e) => setWaterInput(e.target.value)}
            placeholder="Enter water(oz)"
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAddWater}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
