// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { FaPiggyBank, FaWallet, FaChartLine } from "react-icons/fa";

import { TranslationProvider } from "./context/TranslationContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import JoinAjo from "./pages/JoinAjo";

import Partners from "./pages/Partners";
import Cooperative from "./pages/Cooperative";
import SoloThrift from "./pages/SoloThrift";
import GroupThrift from "./pages/GroupThrift";
import Agents from "./pages/Agents";
import SoloThriftSignup from "./pages/SoloThriftSignup";
import GroupThriftSignup from "./pages/GroupThriftSignup";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Marketplace from "./pages/Marketplace";
import VerifyPhone from "./pages/VerifyPhone";
import VerifyBVN from "./pages/VerifyBVN";
import Dashboard from "./pages/dashboard/Dashboard";
import GroupSavings from "./pages/dashboard/GroupSavings";
import PersonalSavings from "./pages/dashboard/PersonalSavings";
import Transactions from "./pages/dashboard/Transactions";
import Profile from "./pages/dashboard/Profile";
import GroupThriftExplore from "./pages/dashboard/GroupThriftExplore";
import GroupDetails from "./pages/dashboard/GroupDetails";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Payments from "./pages/Payments";
import Support from "./pages/Support";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";
import GetStarted from "./pages/GetStarted";

export default function App() {
  return (
    <TranslationProvider>
      <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinAjo />} />

          <Route path="/partners" element={<Partners />} />
          <Route path="/cooperative" element={<Cooperative />} />
          <Route path="/solo-thrift" element={<SoloThrift />} />
          <Route path="/solo-thrift/signup" element={<SoloThriftSignup />} />
          <Route path="/group-thrift" element={<GroupThrift />} />
          <Route path="/group-thrift/signup" element={<GroupThriftSignup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<ProductDetail />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/verify-phone" element={<VerifyPhone />} />
          <Route path="/verify-bvn" element={<VerifyBVN />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route
              index
              element={<div className="p-6">Welcome to your dashboard</div>}
            />
            <Route path="group-thrift" element={<GroupThriftExplore />} />
            <Route path="group/:id" element={<GroupDetails />} />
            <Route path="group-savings" element={<GroupSavings />} />
            <Route path="personal-savings" element={<PersonalSavings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/agents" element={<Agents />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
        </Routes>

        <Footer />
      </>
    </TranslationProvider>
  );
}
