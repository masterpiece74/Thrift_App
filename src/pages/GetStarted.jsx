import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "rubiesthrift-getstarted";

const DEFAULT_STEPS = [
  { id: "create", label: "Create an account", link: "/signup" },
  { id: "verify", label: "Verify phone or BVN", link: "/verify-phone" },
  { id: "payments", label: "Connect payment method", link: "/payments" },
  { id: "explore", label: "Explore the marketplace", link: "/marketplace" },
];

export default function GetStarted() {
  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch (e) {}
  }, [checked]);

  function toggle(id) {
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  }

  function reset() {
    setChecked({});
  }

  const completedCount = DEFAULT_STEPS.filter((s) => checked[s.id]).length;

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Get Started</h1>
        <p className="text-gray-600 mt-2">
          Follow these quick steps to get going.
        </p>
        <div className="mt-3 text-sm text-slate-600">
          {completedCount} of {DEFAULT_STEPS.length} complete
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {DEFAULT_STEPS.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded shadow flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{s.label}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Quick action to complete this step.
                </p>
              </div>
              <div className="ml-4">
                <input
                  aria-label={`Mark ${s.label} complete`}
                  type="checkbox"
                  checked={!!checked[s.id]}
                  onChange={() => toggle(s.id)}
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="mt-4">
              <Link to={s.link} className="text-indigo-600 text-sm">
                Take action →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={reset}
          className="px-3 py-2 border rounded text-sm text-slate-700"
        >
          Reset checklist
        </button>

        <Link to="/support" className="text-sm text-indigo-600">
          Contact support
        </Link>
      </div>
    </div>
  );
}
