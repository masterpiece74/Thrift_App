import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isThriftUser, setIsThriftUser] = useState(() => {
    const saved = localStorage.getItem("rubiesthrift-auth");
    return saved ? JSON.parse(saved) : false;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("rubiesthrift-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [contributions, setContributions] = useState(() => {
    const saved = localStorage.getItem("rubiesthrift-contributions");
    return saved ? parseInt(saved, 10) : 0;
  });

  const completeThriftSignup = (type) => {
    // type can be 'solo' or 'group'
    setIsThriftUser(true);
    localStorage.setItem("rubiesthrift-auth", JSON.stringify(true));
    localStorage.setItem("rubiesthrift-thrift-type", type);
  };

  // Auth helpers: register, login, verify phone (OTP), verify BVN
  const registerUser = async (user) => {
    // MOCK: simulate network delay
    await new Promise((res) => setTimeout(res, 500));

    // Simple validation example
    if (!user.email || !user.password) {
      return { ok: false, message: "Email and password are required" };
    }

    // MOCK success response
    const mockUser = {
      id: "123",
      email: user.email,
      name: user.name || "Mock User",
      phoneVerified: false,
    };

    setCurrentUser(mockUser);
    setIsThriftUser(true);
    localStorage.setItem("rubiesthrift-auth", JSON.stringify(true));
    localStorage.setItem("rubiesthrift-user", JSON.stringify(mockUser));

    return { ok: true, user: mockUser };
  };

  const loginUser = async ({ identifier, password }) => {
    // MOCK: simulate delay
    await new Promise((res) => setTimeout(res, 500));

    if (identifier === "test@example.com" && password === "password123") {
      const mockUser = {
        id: "123",
        email: identifier,
        name: "Test User",
        phoneVerified: true,
      };
      setCurrentUser(mockUser);
      setIsThriftUser(true);
      localStorage.setItem("rubiesthrift-auth", JSON.stringify(true));
      localStorage.setItem("rubiesthrift-user", JSON.stringify(mockUser));
      return { ok: true, user: mockUser };
    } else {
      return { ok: false, message: "Invalid credentials" };
    }
  };

  const logoutUser = () => {
    setIsThriftUser(false);
    setCurrentUser(null);
    localStorage.removeItem("rubiesthrift-auth");
    localStorage.removeItem("rubiesthrift-user");
  };

  const sendOtpToWhatsApp = async (phone) => {
    await new Promise((res) => setTimeout(res, 300));
    // Always succeed in mock — return a test code for UI/testing
    const code = "123456";
    return { ok: true, message: "OTP sent to " + phone, code };
  };

  const verifyOtp = async (phone, code) => {
    await new Promise((res) => setTimeout(res, 300));
    // Mock success if code is '123456'
    if (code === "123456") {
      setIsThriftUser(true);
      localStorage.setItem("rubiesthrift-auth", JSON.stringify(true));
      const saved = JSON.parse(
        localStorage.getItem("rubiesthrift-user") || "null"
      );
      if (saved && saved.phone === phone) {
        const updated = { ...saved, phoneVerified: true };
        setCurrentUser(updated);
        localStorage.setItem("rubiesthrift-user", JSON.stringify(updated));
      }
      return { ok: true, message: "OTP verified" };
    } else {
      return { ok: false, message: "Invalid OTP code" };
    }
  };

  const verifyBVN = async (phone, bvn) => {
    await new Promise((res) => setTimeout(res, 300));
    if (bvn === "12345678901") {
      // example BVN — mark user as BVN-verified in mock
      setIsThriftUser(true);
      const saved = JSON.parse(
        localStorage.getItem("rubiesthrift-user") || "null"
      );
      if (saved) {
        const updated = { ...saved, bvnVerified: true };
        setCurrentUser(updated);
        localStorage.setItem("rubiesthrift-user", JSON.stringify(updated));
      }
      return { ok: true, message: "BVN verified" };
    } else {
      return { ok: false, message: "Invalid BVN" };
    }
  };

  const updateProfile = async (updates) => {
    // Mock network delay
    await new Promise((res) => setTimeout(res, 300));
    setCurrentUser((prev) => {
      const next = { ...(prev || {}), ...updates };
      localStorage.setItem("rubiesthrift-user", JSON.stringify(next));
      return next;
    });
    return { ok: true };
  };

  const recordPayment = (amount) => {
    const value = Number(amount) || 0;
    const next = (contributions || 0) + value;
    setContributions(next);
    localStorage.setItem("rubiesthrift-contributions", String(next));
    return next;
  };

  const hasSufficientFunds = (amount) => {
    return (contributions || 0) >= (Number(amount) || 0);
  };

  const consumeFunds = (amount) => {
    const value = Number(amount) || 0;
    if ((contributions || 0) < value) return false;
    const next = (contributions || 0) - value;
    setContributions(next);
    localStorage.setItem("rubiesthrift-contributions", String(next));
    return next;
  };

  const logout = () => {
    setIsThriftUser(false);
    localStorage.removeItem("rubiesthrift-auth");
    localStorage.removeItem("rubiesthrift-thrift-type");
  };

  const value = {
    isThriftUser,
    currentUser,
    completeThriftSignup,
    registerUser,
    loginUser,
    logoutUser,
    sendOtpToWhatsApp,
    verifyOtp,
    verifyBVN,
    updateProfile,
    contributions,
    recordPayment,
    hasSufficientFunds,
    consumeFunds,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
