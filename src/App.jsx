import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

import AddWater from "./features/water/AddWater";
import AddCalories from "./features/meals/AddCalories";
import AddSleep from "./features/sleep/AddSleep";
import AddSteps from "./features/steps/AddSteps";
import CaloriesChart from "./components/charts/CaloriesChart";
import WaterChart from "./components/charts/WaterChart";
import StepsChart from "./components/charts/StepsChart";
import SleepChart from "./components/charts/SleepChart";
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
          steps: 0,
        };
  });

  const [visibleChart, setVisibleChart] = useState(null);

  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  const weeklyLog = [
    { day: "Mon", calories: 2200, water: 70, steps: 5000, sleep: 7 },
    { day: "Tue", calories: 2100, water: 65, steps: 6000, sleep: 6 },
    { day: "Wed", calories: 2500, water: 75, steps: 7000, sleep: 8 },
    { day: "Thu", calories: 2300, water: 80, steps: 8000, sleep: 6.5 },
    { day: "Fri", calories: 2400, water: 68, steps: 5500, sleep: 7.5 },
    { day: "Sat", calories: 2000, water: 72, steps: 9000, sleep: 9 },
    { day: "Sun", calories: 1900, water: 60, steps: 4000, sleep: 8 },
  ];

  useEffect(() => {
    localStorage.setItem("dailyLog", JSON.stringify(log));
  }, [log]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daily Health Tracker</h1>
        {isAuthenticated ? (
          <div className="flex flex-col items-end gap-1">
            <Button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </Button>
            <span className="text-sm text-gray-700">Welcome, {user.name}</span>
          </div>
        ) : (
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        )}
      </header>

      {isAuthenticated ? (
        <>
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
                    <AddSteps
                      onAdd={(value) =>
                        setLog((prev) => ({
                          ...prev,
                          steps: prev.steps + value,
                        }))
                      }
                    />
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
                  <h2 className="text-xl font-semibold">Your Daily Overview</h2>
                  <p>Calories: {log.calories} kcal</p>
                  <p>Water: {log.water} oz</p>
                  <p>Steps: {log.steps}</p>
                  <p>Sleep: {log.sleep} hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Trends</h2>
                  <div className="space-y-4">
                    {/* Chart Selector Buttons */}
                    <div className="flex gap-2 flex-wrap mb-2">
                      <Button onClick={() => setVisibleChart("calories")}>
                        Calories Chart
                      </Button>
                      <Button onClick={() => setVisibleChart("water")}>
                        Water Chart
                      </Button>
                      <Button onClick={() => setVisibleChart("steps")}>
                        Steps Chart
                      </Button>
                      <Button onClick={() => setVisibleChart("sleep")}>
                        Sleep Chart
                      </Button>
                      <Button
                        onClick={() => setVisibleChart(null)}
                        variant="secondary"
                      >
                        Hide Chart
                      </Button>
                    </div>

                    {/* Conditionally Render Chart Based on VisibleChart */}
                    {visibleChart === "calories" && (
                      <CaloriesChart data={weeklyLog} />
                    )}
                    {visibleChart === "water" && (
                      <WaterChart data={weeklyLog} />
                    )}
                    {visibleChart === "steps" && (
                      <StepsChart data={weeklyLog} />
                    )}
                    {visibleChart === "sleep" && (
                      <SleepChart data={weeklyLog} />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <footer className="app-footer text-center mt-10 text-gray-600">
            Keep tracking your health!
          </footer>
        </>
      ) : (
        <p className="text-center text-gray-600">
          Please log in to use the tracker.
        </p>
      )}
    </div>
  );
}
