import React from "react";
import { FaPiggyBank, FaWallet, FaChartLine } from "react-icons/fa";

export default function Agents() {
  return (
    <div className="bg-linear-to-br from-slate-50 to-teal-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6 bg-linear-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
          Become a Digital Thrift Collector
        </h1>
        <p className="text-lg text-slate-700 mb-8">
          Earn and grow your agency banking business with the inclusion of thrift and Ajo, Esusu, or Adashe rotating savings collection.
        </p>
        <a
          href="/signup"
          className="px-6 py-3 bg-linear-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-md hover:from-teal-700 hover:to-emerald-700"
        >
          Become an Agent
        </a>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-teal-600">
          <FaPiggyBank className="text-teal-600 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-teal-900">Rotating Savings</h2>
          <p className="text-slate-700">
            Help people deposit into their thrift, Ajo, or Esusu wallet with specified period and contribution schedule.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-emerald-600">
          <FaWallet className="text-emerald-600 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-teal-900">Withdrawal</h2>
          <p className="text-slate-700">
            Assist with savings disbursement and loan processing upon availability of customer thrift contributions.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-teal-600">
          <FaChartLine className="text-teal-600 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-teal-900">Revenue</h2>
          <p className="text-slate-700">
            Earn commission on transactions and revenue share on all thrift contributions opted by customers.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-teal-600">
          <h2 className="text-2xl font-bold mb-2 text-teal-900">Rotating Group Savings</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-emerald-600">
          <h2 className="text-2xl font-bold mb-2 text-teal-900">Thrift Contributions</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-teal-600">
          <h2 className="text-2xl font-bold mb-2 text-teal-900">Personal Savings</h2>
        </div>
      </section>

      {/* Join Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center bg-white rounded-xl shadow-lg my-8">
        <h2 className="text-4xl font-bold mb-4">Join AjoMoney</h2>
        <p className="text-slate-700 mb-6">
          Become financially free and included when you build credit through flexible savings such as rotating group savings and thrift contribution with collective investment.
        </p>
        <a
          href="/signup"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
        >
          Get Started
        </a>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-slate-700 mb-2">Email: RubiesThrift</p>
        <p className="text-slate-700 mb-2">Phone: 0903221718 RubiesThrift </p>
      </section>
    </div>
  );
}
