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

// //===========================================

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";

// export default function AddCalories({ onAdd }) {
//   const [showInput, setShowInput] = useState(false);
//   const [calories, setCalories] = useState("");

//   const handleAdd = () => {
//     const value = parseInt(calories, 10);
//     if (!isNaN(value)) {
//       onAdd(value);
//       setCalories("");
//       setShowInput(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {!showInput ? (
//         <Button onClick={() => setShowInput(true)}>+ Add Calories</Button>
//       ) : (
//         <>
//           <Input
//             type="number"
//             value={calories}
//             onChange={(e) => setCalories(e.target.value)}
//             placeholder="Calories"
//             className="w-24 h-10"
//           />
//           <Button onClick={handleAdd}>Add</Button>
//         </>
//       )}
//     </div>
//   );
// }
