import React from "react";
import { Link } from 'react-router-dom';
import GroupImg from "../assets/group.png"; // ✅ your image

export default function GroupThrift() {
  return (
    <div className="py-16 px-6 md:px-20 bg-linear-to-br from-slate-50 to-teal-50">

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-extrabold bg-linear-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-6">Group Thrift</h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Join a community of SMEs and corporate employees pooling funds together for rotating savings
            and access micro-credit with no interest. Grow together. Save together.
          </p>
          <Link
            to="/group-thrift/signup"
            className="px-6 py-3 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-md font-semibold hover:from-teal-700 hover:to-emerald-700"
          >
            Explore Groups
          </Link>
        </div>

        <div className="md:w-1/2">
          <img
            src={GroupImg}
            alt="Group Thrift"
            className="rounded-xl shadow-xl mx-auto"
          />
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="grid md:grid-cols-3 gap-10 mb-24">
        <FeatureCard
          title="Flexible Savings"
          text="You save weekly or monthly based on a calendar. Contributions have a grace period of 7 to 30 days."
        />
        <FeatureCard
          title="Collection Bonus"
          text="Earn rewards when you take the last collection in the group. A percentage of your lump sum is added as a bonus."
        />
        <FeatureCard
          title="0% Interest Credit"
          text="Access micro-credit from peers in rotating savings groups without paying any interest."
        />
      </div>

      {/* TITI STORY SECTION */}
      <div className="bg-linear-to-r from-teal-50 to-emerald-50 p-10 rounded-2xl mb-20 shadow border-l-4 border-teal-600">
        <h2 className="text-3xl font-bold bg-linear-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-4">Here's Titi</h2>
        <p className="text-lg text-slate-700 leading-relaxed">
          She urgently needs to raise ₦500,000 for her business.  
          Titi joins a public group of 4 people who contribute ₦125,000 monthly.  
          She takes the first spot and gains access to ₦500,000 immediately!  
          What’s better? She only pays back ₦125,000 every month — **with zero interest**.
        </p>
      </div>

      {/* JOIN AJOMONEY SECTION */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-extrabold bg-linear-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-4">Join AjoMoney</h2>
        <p className="text-lg text-slate-700 mb-6 max-w-2xl mx-auto">
          Become financially free through flexible savings such as rotating group savings and thrift 
          contribution with collective investment.
        </p>
        <Link
          to="/group-thrift/signup"
          className="px-8 py-3 bg-linear-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-700"
        >
          Get Started
        </Link>
      </div>

      {/* FOOTER-LIKE FEATURE LIST */}
      <div className="grid md:grid-cols-3 gap-8 text-slate-700 text-lg">
        <div>
          <h3 className="font-bold mb-2">Savings and Credit</h3>
          <ul className="space-y-1">
            <li>Rotating group savings</li>
            <li>Personal savings</li>
            <li>Thrift contribution</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Wallet</h3>
          <ul className="space-y-1">
            <li>Send and receive money</li>
            <li>Airtime and data</li>
            <li>Utility bills</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Investment</h3>
          <ul className="space-y-1">
            <li>Investment clan</li>
          </ul>
        </div>
      </div>

      {/* COMPANY INFO */}
      <div className="mt-20 border-t pt-10 text-slate-700">
        <h3 className="font-bold text-xl mb-4">Company</h3>
        <ul className="space-y-1">
          <li>About Us</li>
          <li>Our Story</li>
          <li>Our Team</li>
          <li>Contact</li>
        </ul>

        <p className="mt-6 text-sm">
          Email: contact@ajo.money <br />
          Phone: 0700-AJOMONEY
        </p>

        <p className="mt-8 text-sm text-slate-500">
          © 2025 AjoMoney — Ajo, Esusu, Adashe Rotating Savings
        </p>
      </div>
    </div>
  );
}

/* Small reusable card component */
function FeatureCard({ title, text }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border-t-4 border-teal-600">
      <h3 className="text-xl font-bold bg-linear-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-3">{title}</h3>
      <p className="text-slate-700">{text}</p>
    </div>
  );
}
