import React, { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What is RubiesThrift?",
      a: "RubiesThrift is a thrift platform that offers both solo and group thrifting options along with an online marketplace.",
    },
    {
      q: "How does Group Thrift work?",
      a: "Users join a thrift collection. Once the group size is complete, everyone gains access to discounted thrift items.",
    },
    {
      q: "Can I thrift without joining a group?",
      a: "Yes. Solo Thrift allows users to shop individually without joining any group.",
    },
    {
      q: "Do I need an account to shop?",
      a: "Yes, creating an account gives you access to marketplace features, cart, and notifications.",
    },
    {
      q: "Do you deliver?",
      a: "Yes, we offer nationwide delivery. Delivery costs depend on your location.",
    },
  ];

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-br from-slate-50 to-teal-50 min-h-screen">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-6">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">
        Find answers to the most common questions about RubiesThrift.
      </p>

      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div key={i} className="border border-teal-200 rounded-lg bg-white shadow-sm hover:shadow-md hover:border-teal-400 transition">
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <span className="text-lg font-medium text-teal-900">{item.q}</span>
              <span className="text-2xl text-teal-600">{open === i ? "−" : "+"}</span>
            </button>

            {open === i && (
              <div className="px-4 pb-4 text-slate-700 border-t border-teal-100">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
