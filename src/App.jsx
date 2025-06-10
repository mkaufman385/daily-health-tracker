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

import "./App.css";

export default function App() {
  const [dateString, setDateString] = useState("");
  const [log, setLog] = useState(null);
  const [logHistory, setLogHistory] = useState({});
  const [visibleChart, setVisibleChart] = useState(null);

  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  // Initialize logs from localStorage
  useEffect(() => {
    const now = new Date();

    const formattedDate = now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDateString(formattedDate);

    const todayKey = now.toLocaleDateString();
    const storedHistory = JSON.parse(localStorage.getItem("logHistory")) || {};

    // Initialize today's log if missing
    if (!storedHistory[todayKey]) {
      storedHistory[todayKey] = {
        calories: 0,
        water: 0,
        steps: 0,
        sleep: 0,
      };
    }

    setLog(storedHistory[todayKey]);
    setLogHistory(storedHistory);
  }, []);

  // Update localStorage whenever log changes
  useEffect(() => {
    if (!log || !logHistory) return;

    const todayKey = new Date().toLocaleDateString();

    if (JSON.stringify(logHistory[todayKey]) !== JSON.stringify(log)) {
      const updatedHistory = { ...logHistory, [todayKey]: log };
      setLogHistory(updatedHistory);
      localStorage.setItem("logHistory", JSON.stringify(updatedHistory));
    }
  }, [log]);

  // Create weekly log data with 7 full days
  const weeklyLog = (() => {
    const result = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateKey = date.toLocaleDateString();
      const dayName = date.toLocaleDateString(undefined, { weekday: "short" });

      const dayLog = logHistory[dateKey] || {
        calories: 0,
        water: 0,
        steps: 0,
        sleep: 0,
      };

      result.push({ day: dayName, ...dayLog });
    }

    return result;
  })();

  if (isLoading || !log) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Daily Health Tracker
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-blue-600"
            style={{ width: "40px", height: "40px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </h1>
        <p className="text-sm text-gray-600">{dateString}</p>

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
              <Card>
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold">Log</h2>

                  <div className="flex flex-col gap-4 w-full">
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
              <Card className="your-daily-overview-section-spacing">
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold">Your Daily Overview</h2>
                  <p>
                    <b>Calories:</b> {log.calories} kcal
                  </p>
                  <p>
                    <b>Water:</b> {log.water} oz
                  </p>
                  <p>
                    <b>Steps:</b> {log.steps}
                  </p>
                  <p>
                    <b>Sleep:</b> {log.sleep} hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Trends</h2>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center gap-4 mb-4">
                      {/* Top row: chart buttons */}
                      <div className="flex flex-wrap justify-center gap-2">
                        <Button
                          onClick={() => setVisibleChart("calories")}
                          variant={
                            visibleChart === "calories" ? "default" : "outline"
                          }
                        >
                          Calories Chart
                        </Button>
                        <Button
                          onClick={() => setVisibleChart("water")}
                          variant={
                            visibleChart === "water" ? "default" : "outline"
                          }
                        >
                          Water Chart
                        </Button>
                        <Button
                          onClick={() => setVisibleChart("steps")}
                          variant={
                            visibleChart === "steps" ? "default" : "outline"
                          }
                        >
                          Steps Chart
                        </Button>
                        <Button
                          onClick={() => setVisibleChart("sleep")}
                          variant={
                            visibleChart === "sleep" ? "default" : "outline"
                          }
                        >
                          Sleep Chart
                        </Button>
                      </div>

                      {/* Bottom row: hide chart button */}
                      <Button
                        onClick={() => setVisibleChart(null)}
                        variant={visibleChart === null ? "default" : "outline"}
                      >
                        Hide Chart
                      </Button>
                    </div>

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
          Please log in to track your daily health
        </p>
      )}
    </div>
  );
}
