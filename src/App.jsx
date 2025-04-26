// // import { useState } from "react";
// import Header from "./components/Header";
// import "./App.css";

// function App() {
//   return (
//     <>
//       <div>
//         <Header />
//       </div>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Header from "./components/Header";
import "./App.css";

export default function App() {
  const [log, setLog] = useState({
    meals: [],
    water: 0,
    workouts: [],
    sleep: 0,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daily Health Tracker</h1>
        <Button variant="outline">Log In</Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Log Section */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Log</h2>
              <Button onClick={() => {}}>+ Add Meal</Button>
              <Button onClick={() => {}}>+ Add Water</Button>
              <Button onClick={() => {}}>+ Add Workout</Button>
              <Button onClick={() => {}}>+ Add Sleep</Button>
            </CardContent>
          </Card>
        </div>

        {/* Summary and Trends Section */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Today's Summary</h2>
              <p>Calories: --</p>
              <p>Water: {log.water} oz</p>
              <p>Workouts: {log.workouts.length}</p>
              <p>Sleep: {log.sleep} hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Trends</h2>
              <div className="h-32 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500">[Chart Placeholder]</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="text-center mt-10 text-gray-600">
        Keep tracking your health!
      </footer>
    </div>
  );
}
