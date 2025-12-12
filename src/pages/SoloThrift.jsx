import React, { useState, useEffect } from "react";
import { FaPiggyBank, FaWallet, FaCoins, FaPlus, FaCheckCircle, FaEdit, FaTrash, FaChartLine, FaTrophy, FaCalendar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/TranslationContext";

export default function SoloThrift() {
  const { currentUser, isThriftUser } = useAuth();
  const { t } = useTranslation();
  
  // Personal savings goals state
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("solo-thrift-goals");
    return saved ? JSON.parse(saved) : [];
  });
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [addAmount, setAddAmount] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [editingGoalId, setEditingGoalId] = useState(null);

  useEffect(() => {
    localStorage.setItem("solo-thrift-goals", JSON.stringify(goals));
  }, [goals]);

  function showMessage(msg, type = "success") {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  }

  function handleAddGoal(e) {
    e.preventDefault();
    if (!goalName.trim() || !goalTarget || Number(goalTarget) <= 0) {
      showMessage(t('pleaseFilAllFields'), "error");
      return;
    }

    if (editingGoalId) {
      // Edit existing goal
      setGoals(goals.map(g => g.id === editingGoalId ? {
        ...g,
        name: goalName.trim(),
        target: Number(goalTarget),
        deadline: goalDeadline
      } : g));
      showMessage("Goal updated successfully!", "success");
      setEditingGoalId(null);
    } else {
      // Add new goal
      const newGoal = {
        id: Date.now(),
        name: goalName.trim(),
        target: Number(goalTarget),
        saved: 0,
        deadline: goalDeadline,
        history: [],
        createdAt: new Date().toISOString()
      };
      setGoals([newGoal, ...goals]);
      showMessage(t('successfullySaved'), "success");
    }

    setGoalName("");
    setGoalTarget("");
    setGoalDeadline("");
  }

  function handleEditGoal(goal) {
    setEditingGoalId(goal.id);
    setGoalName(goal.name);
    setGoalTarget(goal.target);
    setGoalDeadline(goal.deadline || "");
    setSelectedGoal(null);
  }

  function handleDeleteGoal(goalId) {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter(g => g.id !== goalId));
      showMessage(t('deletedSuccessfully'), "success");
    }
  }

  function handleAddMoney(e, goalId) {
    e.preventDefault();
    if (!addAmount || Number(addAmount) <= 0) {
      showMessage(t('pleaseFilAllFields'), "error");
      return;
    }

    setGoals(goals.map(g => {
      if (g.id === goalId) {
        const newSaved = g.saved + Number(addAmount);
        return {
          ...g,
          saved: newSaved,
          history: [
            { 
              amount: Number(addAmount), 
              date: new Date().toISOString(),
              id: Date.now()
            },
            ...g.history
          ]
        };
      }
      return g;
    }));

    setAddAmount("");
    setSelectedGoal(null);
    showMessage("₦" + Number(addAmount).toLocaleString() + " added successfully!", "success");
  }

  function handleWithdraw(goalId, amount) {
    if (window.confirm(`Withdraw ₦${amount.toLocaleString()}?`)) {
      setGoals(goals.map(g => {
        if (g.id === goalId && g.saved >= amount) {
          return {
            ...g,
            saved: g.saved - amount,
            history: [
              { 
                amount: -amount, 
                date: new Date().toISOString(),
                id: Date.now()
              },
              ...g.history
            ]
          };
        }
        return g;
      }));
      showMessage("Withdrawal successful!", "success");
    }
  }

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0);
  const completedGoals = goals.filter(g => g.saved >= g.target).length;

  // Only show dashboard and savings if user is signed in
  if (!currentUser || !isThriftUser) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-teal-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border-t-4 border-teal-600 text-center">
          <FaPiggyBank className="text-5xl text-teal-700 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">{t('soloThrift')}</h1>
          <p className="text-lg text-slate-700 mb-6">{t('personalSavings')}</p>
          <p className="text-slate-600">Sign in to access your personal savings and goals dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50 min-h-screen pb-12">
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">{t('personalSavings')}</h1>
            <p className="text-lg text-slate-700">
              Welcome, <span className="font-bold text-teal-700">{currentUser.name || currentUser.email}</span>! {t('soloThriftDesc')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                // Export all goals and their histories into one CSV
                const rows = [["goal_name","goal_id","created_at","goal_target","goal_saved","tx_date","tx_amount","tx_description"]];
                goals.forEach(g => {
                  if (!g.history || g.history.length === 0) {
                    rows.push([g.name, g.id, g.createdAt || '', g.target, g.saved, '', '', '']);
                  } else {
                    g.history.forEach(h => rows.push([g.name, g.id, g.createdAt || '', g.target, g.saved, new Date(h.date).toISOString(), h.amount, '']));
                  }
                });
                const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `all_goals_${new Date().toISOString().slice(0,10)}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 shadow-sm text-sm"
            >
              {t('exportGoals')}
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${messageType === 'success' ? 'bg-green-50 border-green-600 text-green-800' : 'bg-red-50 border-red-600 text-red-800'}`}>
            {message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t('savingsGoals')}</p>
                <p className="text-3xl font-bold text-teal-700 mt-2">{goals.length}</p>
              </div>
              <FaPiggyBank className="text-4xl text-teal-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Saved</p>
                <p className="text-3xl font-bold text-emerald-700 mt-2">₦{totalSaved.toLocaleString()}</p>
              </div>
              <FaWallet className="text-4xl text-emerald-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{t('amount')}</p>
                <p className="text-3xl font-bold text-blue-700 mt-2">₦{totalTarget.toLocaleString()}</p>
              </div>
              <FaChartLine className="text-4xl text-blue-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-purple-700 mt-2">{completedGoals}/{goals.length}</p>
              </div>
              <FaTrophy className="text-4xl text-purple-200" />
            </div>
          </div>
        </div>

        {/* Add/Edit Goal Form */}
        <form onSubmit={handleAddGoal} className="bg-white rounded-xl shadow-lg p-8 mb-12 border-t-4 border-teal-600">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
            <FaPiggyBank className="text-teal-700" /> {editingGoalId ? 'Edit Goal' : t('addGoal')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t('goalName')}</label>
              <input 
                type="text" 
                value={goalName} 
                onChange={e => setGoalName(e.target.value)} 
                placeholder="e.g. Emergency Fund, Vacation" 
                className="w-full border-2 border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t('targetAmount')} (₦)</label>
              <input 
                type="number" 
                value={goalTarget} 
                onChange={e => setGoalTarget(e.target.value)} 
                placeholder="100000" 
                className="w-full border-2 border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t('deadline')}</label>
              <input 
                type="date" 
                value={goalDeadline} 
                onChange={e => setGoalDeadline(e.target.value)} 
                className="w-full border-2 border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-700 transition flex items-center gap-2 shadow-md"
            >
              <FaPlus /> {editingGoalId ? t('updateGoal') : t('addGoal')}
            </button>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-slate-600 mr-2">{t('quickAmounts')}:</span>
              {[1000, 5000, 10000, 50000].map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setGoalTarget(String(a))}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 text-sm"
                >
                  ₦{a.toLocaleString()}
                </button>
              ))}
            </div>
            {editingGoalId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingGoalId(null);
                  setGoalName("");
                  setGoalTarget("");
                  setGoalDeadline("");
                }}
                className="px-8 py-3 bg-slate-300 text-slate-800 font-semibold rounded-lg hover:bg-slate-400 transition"
              >
                {t('cancel')}
              </button>
            )}
          </div>
        </form>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <FaPiggyBank className="text-6xl text-slate-300 mx-auto mb-4" />
              <p className="text-xl text-slate-600 mb-2">No savings goals yet</p>
              <p className="text-slate-500">Create your first goal to start saving!</p>
            </div>
          ) : (
            goals.map(goal => {
              const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100));
              const isCompleted = goal.saved >= goal.target;
              const daysLeft = goal.deadline ? Math.max(0, Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))) : null;

              return (
                <div key={goal.id} className={`bg-white rounded-xl shadow-lg p-8 border-t-4 transition ${isCompleted ? 'border-emerald-600 bg-emerald-50' : 'border-teal-600'}`}>
                  {/* Goal Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-teal-900">{goal.name}</h3>
                        {isCompleted && <FaTrophy className="text-2xl text-yellow-500" />}
                      </div>
                      <p className="text-slate-600">Target: <span className="font-semibold text-teal-700">₦{goal.target.toLocaleString()}</span></p>
                      {goal.deadline && (
                        <p className="text-slate-600 mt-1 flex items-center gap-2">
                          <FaCalendar className="text-sm" /> Due: {new Date(goal.deadline).toLocaleDateString()}
                          {daysLeft !== null && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{daysLeft} days left</span>}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-teal-700">{percent}%</p>
                        <p className="text-xs text-slate-500">Complete</p>
                      </div>
                      <FaCheckCircle className={`text-3xl ${isCompleted ? 'text-emerald-600' : 'text-slate-300'}`} />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mb-2">
                      <div 
                        className="bg-gradient-to-r from-teal-600 to-emerald-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: percent + "%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-teal-700">₦{goal.saved.toLocaleString()} saved</span>
                      <span className="text-slate-500">₦{(goal.target - goal.saved).toLocaleString()} remaining</span>
                    </div>
                  </div>

                  {/* Action Forms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-200">
                    {/* Add Money Form */}
                    <form onSubmit={e => handleAddMoney(e, goal.id)} className="flex gap-2">
                      <input 
                        type="number" 
                        min="1" 
                        value={selectedGoal === goal.id ? addAmount : ""} 
                        onChange={e => { setSelectedGoal(goal.id); setAddAmount(e.target.value); }} 
                        placeholder="Add money (₦)" 
                        className="flex-1 border-2 border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" 
                      />
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition flex items-center gap-2 whitespace-nowrap"
                      >
                        <FaPlus className="text-sm" /> Add
                      </button>
                    </form>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditGoal(goal)}
                        className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition flex items-center justify-center gap-2"
                      >
                        <FaEdit className="text-sm" /> Edit
                      </button>
                      {goal.saved > 0 && (
                        <button 
                          onClick={() => handleWithdraw(goal.id, goal.saved)}
                          className="flex-1 px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition flex items-center justify-center gap-2"
                        >
                          <FaWallet className="text-sm" /> Withdraw
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="flex-1 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition flex items-center justify-center gap-2"
                      >
                        <FaTrash className="text-sm" /> Delete
                      </button>
                    </div>
                  </div>

                  {/* Transaction History */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-slate-600">{t('transactions')}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          // Export this goal's history as CSV
                          const rows = [['date','amount','description']];
                          goal.history.forEach(h => rows.push([new Date(h.date).toISOString(), String(h.amount), '']));
                          const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
                          const blob = new Blob([csv], { type: 'text/csv' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${goal.name.replace(/\s+/g,'_')}_transactions.csv`;
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                          URL.revokeObjectURL(url);
                        }}
                        className="px-3 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 text-sm"
                      >
                        {t('exportCSV')}
                      </button>
                    </div>
                  </div>

                  {goal.history.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-teal-900 mb-4 flex items-center gap-2">
                        <FaChartLine className="text-sm" /> Transaction History
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {goal.history.slice(0, 5).map((h) => (
                          <div key={h.id} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded">
                            <span className={h.amount > 0 ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}>
                              {h.amount > 0 ? '+' : ''}₦{Math.abs(h.amount).toLocaleString()}
                            </span>
                            <span className="text-slate-500">{new Date(h.date).toLocaleDateString()}</span>
                          </div>
                        ))}
                        {goal.history.length > 5 && (
                          <p className="text-xs text-slate-500 text-center pt-2">+{goal.history.length - 5} more transactions</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
