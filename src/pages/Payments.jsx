import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaCreditCard,
  FaHistory,
  FaWallet,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { makePayment, initPaystackScript } from "../config/paystack";

export default function Payments() {
  const { currentUser, contributions, recordPayment } = useAuth();
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [verifyingPaymentId, setVerifyingPaymentId] = useState(null);
  const [transactionRef, setTransactionRef] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize Paystack and load payment history
  useEffect(() => {
    // load Paystack script and ensure it's ready
    (async () => {
      const ok = await initPaystackScript();
      if (!ok) console.warn("Paystack script failed to load");
    })();

    const history = JSON.parse(localStorage.getItem("payment-history") || "[]");
    setPaymentHistory(history);
  }, []);

  const handlePaystackPayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setError("Please enter a valid amount (minimum ₦100)");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (parseFloat(paymentAmount) < 100) {
      setError("Minimum payment is ₦100");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const email = currentUser?.email || "customer@example.com";
    const userId = currentUser?.id || "default-user";
    setProcessing(true);
    setError("");
    setSuccess("");

    try {
      // Initiate payment with your API
      const initiateRes = await fetch(
        "https://thrifthackathon.onrender.com/api/v1/checkout/initiate",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            email: email,
            amount: parseFloat(paymentAmount),
            reference: `ref-${Date.now()}`,
            paymentMethod: "paystack",
          }),
        }
      );

      let initiateData;
      try {
        initiateData = await initiateRes.json();
      } catch (jsonErr) {
        const textResponse = await initiateRes.text();
        console.error(
          "Failed to parse initiate response as JSON:",
          textResponse
        );
        throw new Error(
          `API Error: ${textResponse || "Payment initiation failed"}`
        );
      }
      console.log("Checkout initiate response:", initiateData);

      if (!initiateRes.ok || !initiateData.ok) {
        throw new Error(initiateData?.message || "Failed to initiate payment");
      }

      // Verify transaction with your API
      try {
        const verifyRes = await fetch(
          "https://thrifthackathon.onrender.com/api/v1/checkout/verify",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userId,
              reference: initiateData.reference || `ref-${Date.now()}`,
            }),
          }
        );

        let verifyData;
        try {
          verifyData = await verifyRes.json();
        } catch (jsonErr) {
          const textResponse = await verifyRes.text();
          console.error(
            "Failed to parse verify response as JSON:",
            textResponse
          );
          throw new Error(
            `Verification Error: ${
              textResponse || "Payment verification failed"
            }`
          );
        }
        console.log("Checkout verify response:", verifyData);

        if (!verifyRes.ok || !verifyData.ok) {
          throw new Error(
            verifyData?.message || "Payment could not be verified"
          );
        }
      } catch (verErr) {
        console.error("Verification failed", verErr);
        throw verErr;
      }

      // Payment successful - record in wallet
      const newBalance = recordPayment(parseFloat(paymentAmount));

      // Add to payment history
      const newPayment = {
        id: initiateData.reference || `ref-${Date.now()}`,
        amount: parseFloat(paymentAmount),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        method: "Paystack",
        status: "Completed",
        reference: initiateData.reference,
        timestamp: new Date().getTime(),
      };

      const updatedHistory = [newPayment, ...paymentHistory];
      setPaymentHistory(updatedHistory);
      localStorage.setItem("payment-history", JSON.stringify(updatedHistory));

      setTransactionRef(initiateData.reference);
      setSuccess(
        `Payment successful! Wallet updated to ₦${newBalance.toLocaleString()}`
      );
      setPaymentAmount("");

      // Auto clear success message
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setProcessing(false);
    }
  };

  const handleBankTransfer = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setError("Please enter a valid amount");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Create bank transfer record
    const newPayment = {
      id: "BANK-" + Math.random().toString(36).substr(2, 9),
      amount: parseFloat(paymentAmount),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      method: "Bank Transfer",
      status: "Pending - Awaiting Verification",
      reference: "Manual bank transfer",
      timestamp: new Date().getTime(),
    };

    const updatedHistory = [newPayment, ...paymentHistory];
    setPaymentHistory(updatedHistory);
    localStorage.setItem("payment-history", JSON.stringify(updatedHistory));

    setSuccess(
      `Bank transfer initiated!\n\nPlease transfer ₦${parseFloat(
        paymentAmount
      ).toLocaleString()} to:\nAccount: 1234567890\nBank: RubiesThrift Bank\nReference: ${
        newPayment.id
      }`
    );
    setPaymentAmount("");
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleMobileTransfer = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setError("Please enter a valid amount");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Create mobile money record
    const newPayment = {
      id: "MOBILE-" + Math.random().toString(36).substr(2, 9),
      amount: parseFloat(paymentAmount),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      method: "Mobile Money",
      status: "Pending - Awaiting Verification",
      reference: "Mobile money transfer initiated",
      timestamp: new Date().getTime(),
    };

    const updatedHistory = [newPayment, ...paymentHistory];
    setPaymentHistory(updatedHistory);
    localStorage.setItem("payment-history", JSON.stringify(updatedHistory));

    setSuccess(
      `Mobile money initiated!\n\nAmount: ₦${parseFloat(
        paymentAmount
      ).toLocaleString()}\nReference: ${
        newPayment.id
      }\n\nPlease complete the payment on your mobile device.`
    );
    setPaymentAmount("");
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleVerifyPendingPayment = async (payment) => {
    setVerifyingPaymentId(payment.id);
    setError("");
    setSuccess("");

    try {
      const userId = currentUser?.id || "default-user";

      // Call verify endpoint for pending payment
      const verifyRes = await fetch(
        "https://thrifthackathon.onrender.com/api/v1/checkout/verify",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            reference: payment.id,
            amount: payment.amount,
          }),
        }
      );

      let verifyData;
      try {
        verifyData = await verifyRes.json();
      } catch (jsonErr) {
        const textResponse = await verifyRes.text();
        console.error("Failed to parse verify response as JSON:", textResponse);
        throw new Error(
          `Verification Error: ${textResponse || "Payment verification failed"}`
        );
      }
      console.log("Payment verification response:", verifyData);

      if (!verifyRes.ok || !verifyData.ok) {
        throw new Error(verifyData?.message || "Payment verification failed");
      }

      // Update payment status to Completed
      const updatedHistory = paymentHistory.map((p) =>
        p.id === payment.id ? { ...p, status: "Completed" } : p
      );
      setPaymentHistory(updatedHistory);
      localStorage.setItem("payment-history", JSON.stringify(updatedHistory));

      // Record payment in wallet
      recordPayment(payment.amount);

      setSuccess(
        `Payment verified! ₦${payment.amount.toLocaleString()} added to your wallet.`
      );
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Failed to verify payment");
      setTimeout(() => setError(""), 3000);
    } finally {
      setVerifyingPaymentId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Payment Center
          </h1>
          <p className="text-slate-600">
            Make payments to your RubiesThrift account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FaCreditCard className="text-slate-700" />
                Make a Payment
              </h2>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <FaExclamationCircle className="text-red-600 text-xl" />
                  <div>
                    <div className="font-semibold text-red-900">
                      Payment Error
                    </div>
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl" />
                  <div>
                    <div className="font-semibold text-green-900">Success!</div>
                    <div className="text-sm text-green-700">{success}</div>
                  </div>
                </div>
              )}

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount in Naira"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
                <p className="text-xs text-slate-500 mt-1">Minimum: ₦100</p>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <label
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition"
                    style={{
                      borderColor:
                        paymentMethod === "paystack" ? "#1e293b" : "#e2e8f0",
                    }}
                  >
                    <input
                      type="radio"
                      value="paystack"
                      checked={paymentMethod === "paystack"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <div className="font-semibold text-slate-900">
                        Paystack Card Payment
                      </div>
                      <div className="text-xs text-slate-600">
                        Credit/Debit Card, Mobile Money, Bank Transfer
                      </div>
                    </div>
                  </label>

                  <label
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition"
                    style={{
                      borderColor:
                        paymentMethod === "bank" ? "#1e293b" : "#e2e8f0",
                    }}
                  >
                    <input
                      type="radio"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <div className="font-semibold text-slate-900">
                        Bank Transfer
                      </div>
                      <div className="text-xs text-slate-600">
                        Direct bank account transfer
                      </div>
                    </div>
                  </label>

                  <label
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-slate-50 transition"
                    style={{
                      borderColor:
                        paymentMethod === "mobile" ? "#1e293b" : "#e2e8f0",
                    }}
                  >
                    <input
                      type="radio"
                      value="mobile"
                      checked={paymentMethod === "mobile"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <div className="font-semibold text-slate-900">
                        Mobile Money
                      </div>
                      <div className="text-xs text-slate-600">
                        MTN Mobile Money, Airtel Money
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Buttons */}
              {paymentMethod === "paystack" && (
                <button
                  onClick={handlePaystackPayment}
                  disabled={processing || !paymentAmount}
                  className={`w-full py-3 rounded-lg font-bold text-white transition ${
                    processing || !paymentAmount
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {processing ? "Processing Payment..." : "Pay with Paystack"}
                </button>
              )}

              {paymentMethod === "bank" && (
                <button
                  onClick={handleBankTransfer}
                  disabled={!paymentAmount}
                  className="w-full py-3 rounded-lg font-bold text-white bg-slate-700 hover:bg-slate-800 transition disabled:bg-gray-400"
                >
                  Initiate Bank Transfer
                </button>
              )}

              {paymentMethod === "mobile" && (
                <button
                  onClick={handleMobileTransfer}
                  disabled={!paymentAmount}
                  className="w-full py-3 rounded-lg font-bold text-white bg-slate-700 hover:bg-slate-800 transition disabled:bg-gray-400"
                >
                  Initiate Mobile Money
                </button>
              )}

              {/* Transaction Reference */}
              {transactionRef && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 text-xl" />
                  <div>
                    <div className="font-semibold text-green-900">
                      Payment Successful
                    </div>
                    <div className="text-xs text-green-700">
                      Reference: {transactionRef}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Wallet & Info */}
          <div className="space-y-6">
            {/* Wallet Balance */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm opacity-90">Wallet Balance</h3>
                <FaWallet className="text-2xl opacity-70" />
              </div>
              <div className="text-3xl font-bold">
                ₦{(contributions || 0).toLocaleString()}
              </div>
              <p className="text-xs opacity-75 mt-2">Total funds available</p>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4">
                Account Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-slate-600 text-xs">Name</div>
                  <div className="font-semibold text-slate-900">
                    {currentUser?.name || "User"}
                  </div>
                </div>
                <div>
                  <div className="text-slate-600 text-xs">Email</div>
                  <div className="font-semibold text-slate-900">
                    {currentUser?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 text-sm mb-2">
                Payment Tips
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>✓ Instant Paystack payments</li>
                <li>✓ Bank transfers within 24hrs</li>
                <li>✓ Mobile money is instant</li>
                <li>✓ All payments are secure</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FaHistory className="text-slate-700" />
            Payment History
          </h2>

          {paymentHistory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">
                No payments yet. Make your first payment above!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-3 px-4 font-bold text-slate-900">
                      Date & Time
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-slate-900">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-slate-900">
                      Method
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-slate-900">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-slate-900">
                      Reference
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-slate-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-200 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4">
                        <div className="text-slate-900 font-medium">
                          {payment.date}
                        </div>
                        <div className="text-xs text-slate-600">
                          {payment.time}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ₦{payment.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {payment.method}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-600 font-mono">
                        {payment.reference.substring(0, 15)}...
                      </td>
                      <td className="py-3 px-4">
                        {payment.status ===
                        "Pending - Awaiting Verification" ? (
                          <button
                            onClick={() => handleVerifyPendingPayment(payment)}
                            disabled={verifyingPaymentId === payment.id}
                            className="px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded hover:bg-teal-700 disabled:bg-teal-400 transition"
                          >
                            {verifyingPaymentId === payment.id ? "Verifying..." : "Verify"}
                          </button>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
