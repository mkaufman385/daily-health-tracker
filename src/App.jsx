import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddWater from "./features/water/AddWater";
import AddCalories from "./features/meals/AddCalories";
import AddSleep from "./features/sleep/AddSleep";
// import Header from "./components/Header";
import "./App.css";

export default function App() {
  const [log, setLog] = useState(() => {
    const savedLog = localStorage.getItem("dailyLog");
    return savedLog
      ? JSON.parse(savedLog)
      : {
          calories: 0,
          meals: [],
          water: 0,
          workouts: [],
          sleep: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("dailyLog", JSON.stringify(log));
  }, [log]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daily Health Tracker</h1>
        <Button className="logInButton" variant="outline">
          Log In
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Log Section */}
        <div className="log-section-spacing space-y-4">
          <Card className="log-section-spacing">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Log</h2>

              <div className="flex flex-col gap-4">
                <AddCalories
                  onAdd={(value) =>
                    setLog((prev) => ({
                      ...prev,
                      calories: prev.calories + value,
                    }))
                  }
                />
                <AddWater
                  onAdd={(value) =>
                    setLog((prev) => ({
                      ...prev,
                      water: prev.water + value,
                    }))
                  }
                />
                <Button onClick={() => {}}>+ Add Workout</Button>
                <AddSleep
                  onAdd={(value) =>
                    setLog((prev) => ({
                      ...prev,
                      sleep: prev.sleep + value,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary and Trends Section */}
        <div className="space-y-4">
          <Card className="summary-section-spacing">
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">Today's Summary</h2>
              <p>Calories: {log.calories} kcal</p>
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

      <footer className="app-footer text-center mt-10 text-gray-600">
        Keep tracking your health!
      </footer>
    </div>
  );
}

//------------------------------------------------------------------------
