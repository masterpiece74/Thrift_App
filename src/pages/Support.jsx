import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset, FaTicketAlt, FaComments } from 'react-icons/fa';

export default function Support() {
  const [activeTab, setActiveTab] = useState('contact');
  const [messageCounter, setMessageCounter] = useState(0);
  const [supportTickets, setSupportTickets] = useState(() => {
    const saved = localStorage.getItem('support-tickets');
    return saved ? JSON.parse(saved) : [];
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('chat-messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [chatInput, setChatInput] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      setSubmitStatus('Please fill in all fields');
      return;
    }

    // Create ticket
    const ticket = {
      id: Date.now(),
      ...contactForm,
      status: 'open',
      createdAt: new Date().toLocaleDateString(),
      priority: 'medium'
    };

    const updatedTickets = [ticket, ...supportTickets];
    setSupportTickets(updatedTickets);
    localStorage.setItem('support-tickets', JSON.stringify(updatedTickets));

    setSubmitStatus('Ticket created successfully! Reference: #' + ticket.id);
    setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitStatus(''), 3000);
  };

  // Handle chat submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    
    if (!chatInput.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nextId = messageCounter + 1;
    setMessageCounter(nextId);
    
    const userMessage = {
      id: nextId,
      text: chatInput,
      sender: 'user',
      timestamp: timestamp
    };

    const messages = [...chatMessages, userMessage];

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: nextId + 1,
        text: getBotResponse(chatInput),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const finalMessages = [...messages, botResponse];
      setChatMessages(finalMessages);
      localStorage.setItem('chat-messages', JSON.stringify(finalMessages));
      setMessageCounter(nextId + 1);
    }, 800);

    setChatMessages(messages);
    localStorage.setItem('chat-messages', JSON.stringify(messages));
    setChatInput('');
  };

  // Bot responses
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('payment') || input.includes('transaction')) {
      return 'Payments are processed instantly via Paystack. Your wallet updates in real-time. For failed transactions, check your account and contact us with details.';
    }
    if (input.includes('withdraw') || input.includes('withdraw funds')) {
      return 'You can withdraw funds directly from your wallet to your registered bank account. Go to Dashboard > Wallet > Withdraw.';
    }
    if (input.includes('group') || input.includes('group thrift')) {
      return 'Group Thrift (Ajo) allows you to join savings groups with fixed contribution schedules. You\'ll receive a lump sum when your turn comes.';
    }
    if (input.includes('solo')) {
      return 'Solo Thrift is personal savings at your own pace. You control your contributions and can withdraw anytime.';
    }
    if (input.includes('marketplace')) {
      return 'Use your wallet balance to shop in the marketplace. Add items to cart and checkout with Paystack payment.';
    }
    if (input.includes('verification')) {
      return 'Complete verification by uploading a selfie, government ID, and proof of address. This unlocks full account features.';
    }
    if (input.includes('security') || input.includes('safe')) {
      return 'Your data is encrypted and secured. We use industry-standard security protocols to protect your information.';
    }
    return 'Thanks for reaching out! Our support team will get back to you soon. For urgent issues, call us at +234-700-RUBIES.';
  };

  // Close ticket
  const closeTicket = (ticketId) => {
    const updated = supportTickets.map(t => 
      t.id === ticketId ? { ...t, status: 'closed' } : t
    );
    setSupportTickets(updated);
    localStorage.setItem('support-tickets', JSON.stringify(updated));
  };

  const faqs = [
    {
      q: 'How do I top up my wallet?',
      a: 'Go to Dashboard > Make Payment or Marketplace > Top Up. Choose your payment method and complete the transaction.'
    },
    {
      q: 'Can I join multiple groups?',
      a: 'Yes! You can join multiple group thrift circles. Each group has its own contribution schedule and members.'
    },
    {
      q: 'What happens if I miss a contribution?',
      a: 'Groups have grace periods (7-30 days). Missing contributions may affect your group standing and eligibility for payouts.'
    },
    {
      q: 'Is my money safe?',
      a: 'Yes. Your funds are secure with encrypted transactions and industry-standard security protocols.'
    },
    {
      q: 'How long does verification take?',
      a: 'Verification typically takes 24-48 hours after submission. You\'ll receive an email confirmation.'
    },
    {
      q: 'Can I invite friends to groups?',
      a: 'Yes! Share your group code with friends. They can join using the invite link from your dashboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-4">
            Support Center
          </h1>
          <p className="text-lg text-slate-700">Get help, submit tickets, and chat with our support team</p>
        </div>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-teal-600 hover:shadow-lg transition">
            <FaPhone className="text-teal-600 text-3xl mb-3" />
            <h3 className="font-bold text-teal-900 mb-1">Phone</h3>
            <p className="text-slate-700">+234-700-RUBIES</p>
            <p className="text-xs text-slate-500 mt-1">Mon-Fri, 9AM-6PM</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-emerald-600 hover:shadow-lg transition">
            <FaEnvelope className="text-emerald-600 text-3xl mb-3" />
            <h3 className="font-bold text-teal-900 mb-1">Email</h3>
            <p className="text-slate-700">support@rubiesthrift.com</p>
            <p className="text-xs text-slate-500 mt-1">Response in 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-teal-600 hover:shadow-lg transition">
            <FaClock className="text-teal-600 text-3xl mb-3" />
            <h3 className="font-bold text-teal-900 mb-1">Hours</h3>
            <p className="text-slate-700">9:00 AM - 6:00 PM</p>
            <p className="text-xs text-slate-500 mt-1">Monday to Friday</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-emerald-600 hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-emerald-600 text-3xl mb-3" />
            <h3 className="font-bold text-teal-900 mb-1">Location</h3>
            <p className="text-slate-700">Lagos, Nigeria</p>
            <p className="text-xs text-slate-500 mt-1">Head Office</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-4 rounded-xl shadow">
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === 'contact'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FaHeadset /> Contact Us
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === 'tickets'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FaTicketAlt /> My Tickets
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FaComments /> Live Chat
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === 'faq'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ❓ FAQs
          </button>
        </div>

        {/* Contact Form Tab */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-teal-600">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">Submit a Support Request</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="+234801234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 h-32"
                  placeholder="Describe your issue..."
                />
              </div>

              {submitStatus && (
                <div className={`p-3 rounded-lg ${submitStatus.includes('successfully') ? 'bg-teal-50 text-teal-800 border border-teal-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-700 transition"
              >
                Submit Support Request
              </button>
            </form>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-600">
            <h2 className="text-3xl font-bold text-teal-900 mb-6">Your Support Tickets</h2>
            {supportTickets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600 mb-4">No tickets yet</p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700"
                >
                  Create a Ticket
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {supportTickets.map(ticket => (
                  <div key={ticket.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-teal-900">{ticket.subject}</h3>
                        <p className="text-sm text-slate-600">Ticket #: {ticket.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        ticket.status === 'open' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-slate-700 mb-3">{ticket.message}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-slate-500">Submitted: {ticket.createdAt}</p>
                      {ticket.status === 'open' && (
                        <button
                          onClick={() => closeTicket(ticket.id)}
                          className="text-sm px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition"
                        >
                          Mark as Closed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-teal-600">
            <div className="h-96 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <FaComments className="text-4xl text-teal-300 mx-auto mb-4" />
                    <p className="text-slate-600">Hello! How can we help you today?</p>
                  </div>
                ) : (
                  chatMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        <p>{msg.text}</p>
                        <p className="text-xs mt-1 opacity-75">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="border-t border-slate-200 p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 font-semibold transition"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition border-l-4 border-l-teal-600">
                <div className="p-6">
                  <h3 className="font-bold text-lg text-teal-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-700">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
