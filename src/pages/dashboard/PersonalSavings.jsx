

import React, { useState, useEffect } from 'react';
import { FaPiggyBank, FaPlus, FaCheckCircle, FaBell, FaCalendarAlt, FaFileExport } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';

export default function PersonalSavings() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('personal-savings-goals');
    return saved ? JSON.parse(saved) : [];
  });
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [goalReminder, setGoalReminder] = useState("");
  const [addAmount, setAddAmount] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem('personal-savings-goals', JSON.stringify(goals));
  }, [goals]);

  function handleAddGoal(e) {
    e.preventDefault();
    if (!goalName.trim() || !goalTarget || Number(goalTarget) <= 0) {
      setMessage("Enter a valid goal name and target amount");
      return;
    }
    const newGoal = {
      id: Date.now(),
      name: goalName.trim(),
      target: Number(goalTarget),
      saved: 0,
      history: [],
      deadline: goalDeadline,
      reminder: goalReminder
    };
    setGoals([newGoal, ...goals]);
    setGoalName("");
    setGoalTarget("");
    setGoalDeadline("");
    setGoalReminder("");
    setMessage("Goal added!");
    setTimeout(() => setMessage(""), 2000);
  }

  // eslint-disable-next-line no-unused-vars
  function handleSelectGoal(goal) {
    setSelectedGoal(goal.id);
    setAddAmount("");
    setMessage("");
  }

  function handleAddMoney(e) {
    e.preventDefault();
    if (!addAmount || Number(addAmount) <= 0) {
      setMessage("Enter a valid amount");
      return;
    }
    setGoals(goals.map(g => {
      if (g.id === selectedGoal) {
        const newSaved = g.saved + Number(addAmount);
        return {
          ...g,
          saved: newSaved,
          history: [
            { amount: Number(addAmount), date: new Date().toISOString() },
            ...g.history
          ]
        };
      }
      return g;
    }));
    setAddAmount("");
    setMessage("Money added!");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50 min-h-screen">
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent text-center">Personal Savings</h1>
        <p className="text-lg text-slate-700 mb-8 text-center">
          Track your personal savings goals and progress.
        </p>

        {/* Add Goal Form */}
        <form onSubmit={handleAddGoal} className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-teal-600">
          <h2 className="text-2xl font-bold text-teal-900 mb-4 flex items-center gap-2"><FaPiggyBank /> Add Savings Goal</h2>
          {message && <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-600 text-green-800 rounded-lg">{message}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Goal Name</label>
              <input type="text" value={goalName} onChange={e => setGoalName(e.target.value)} placeholder="e.g. Emergency Fund" className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Amount (₦)</label>
              <input type="number" value={goalTarget} onChange={e => setGoalTarget(e.target.value)} placeholder="50000" className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"><FaCalendarAlt /> Deadline</label>
              <input type="date" value={goalDeadline} onChange={e => setGoalDeadline(e.target.value)} className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2"><FaBell /> Reminder (days before)</label>
              <input type="number" min="0" value={goalReminder} onChange={e => setGoalReminder(e.target.value)} placeholder="e.g. 3" className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
          <button type="submit" className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-700 flex items-center gap-2"><FaPlus /> Add Goal</button>
        </form>

        {/* Goals List */}
        <div className="space-y-8">
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <FaPiggyBank className="text-5xl text-slate-300 mx-auto mb-4" />
              <p className="text-lg text-slate-600 mb-4">No savings goals yet</p>
            </div>
          ) : (
            <>
              {/* Chart Visualization */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-emerald-600">
                <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2"><FaPiggyBank /> Savings Progress Chart</h3>
                <Doughnut
                  data={{
                    labels: goals.map(g => g.name),
                    datasets: [{
                      data: goals.map(g => g.saved),
                      backgroundColor: [
                        '#14b8a6', '#10b981', '#f59e0b', '#6366f1', '#f43f5e', '#22d3ee', '#a3e635'
                      ],
                    }],
                  }}
                  options={{
                    plugins: {
                      legend: { position: 'bottom' },
                    },
                  }}
                />
              </div>
              {goals.map(goal => {
                const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100));
                // Reminder logic
                let reminderText = "";
                if (goal.deadline && goal.reminder) {
                  const deadlineDate = new Date(goal.deadline);
                  const today = new Date();
                  const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                  if (diffDays <= Number(goal.reminder) && diffDays > 0) {
                    reminderText = `⏰ Reminder: ${diffDays} day(s) left to reach your goal!`;
                  }
                }
                return (
                  <div key={goal.id} className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-600">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-teal-900 mb-1">{goal.name}</h3>
                        <p className="text-slate-700">Target: ₦{goal.target.toLocaleString()}</p>
                        {goal.deadline && (
                          <p className="text-sm text-amber-700 flex items-center gap-2"><FaCalendarAlt /> Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                        )}
                        {reminderText && (
                          <p className="text-sm text-emerald-700 flex items-center gap-2"><FaBell /> {reminderText}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <FaCheckCircle className={percent === 100 ? "text-emerald-600 text-2xl" : "text-slate-300 text-2xl"} />
                        <span className="font-semibold text-teal-700">{percent}%</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="w-full bg-slate-100 rounded-full h-4">
                        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 h-4 rounded-full" style={{ width: percent + "%" }}></div>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-teal-700 font-bold">₦{goal.saved.toLocaleString()}</span>
                        <span className="text-slate-500">Saved</span>
                      </div>
                    </div>
                    <form onSubmit={e => { setSelectedGoal(goal.id); handleAddMoney(e); }} className="flex flex-col md:flex-row gap-4 items-center mb-4">
                      <input type="number" min="1" value={selectedGoal === goal.id ? addAmount : ""} onChange={e => { setSelectedGoal(goal.id); setAddAmount(e.target.value); }} placeholder="Add money (₦)" className="w-full md:w-40 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                      <button type="submit" className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 flex items-center gap-2"><FaPlus /> Add Money</button>
                    </form>
                    {goal.history.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-teal-900 mb-2">Transaction History</h4>
                        <ul className="space-y-2 text-sm">
                          {goal.history.map((h, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>₦{h.amount.toLocaleString()}</span>
                              <span className="text-slate-500">{new Date(h.date).toLocaleDateString()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Export Button */}
                    <button
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-300 text-white font-semibold rounded-lg flex items-center gap-2"
                      onClick={() => {
                        const data = JSON.stringify(goal, null, 2);
                        const blob = new Blob([data], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${goal.name}-savings.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <FaFileExport /> Export Goal Data
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
