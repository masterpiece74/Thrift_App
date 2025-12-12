import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isThriftUser } = useAuth();

  if (!isThriftUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-white p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-6">
            Only Solo Thrift and Group Thrift members can access the marketplace. Please create an account first.
          </p>
          <div className="space-y-3">
            <a
              href="/solo-thrift/signup"
              className="block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Create Solo Thrift Account
            </a>
            <a
              href="/group-thrift/signup"
              className="block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Create Group Thrift Account
            </a>
            <a
              href="/"
              className="block px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
