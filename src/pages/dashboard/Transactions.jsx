import React, { useEffect, useState } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  async function manualRetry() {
    setLoading(true);
    setError(null);
    setPreview('');
    setShowPreview(false);
    try {
      // Try relative first
      const res = await fetch('/api/admin/transactions');
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const json = await res.json();
        if (!json.ok) throw new Error(json.message || 'Failed to load');
        setTransactions(json.transactions || []);
        return;
      }

      // Try explicit localhost fallback
      const fallback = await fetch('http://localhost:4000/api/admin/transactions');
      const fct = fallback.headers.get('content-type') || '';
      if (fct.includes('application/json')) {
        const fj = await fallback.json();
        if (!fj.ok) throw new Error(fj.message || 'Failed to load from fallback');
        setTransactions(fj.transactions || []);
        return;
      }

      const text = await res.text();
      const short = text ? text.replace(/\s+/g, ' ').slice(0, 300) : '';
      setPreview(short);
      setError('Server returned non-JSON. Start backend or configure /api proxy.');
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/transactions');
        // Defensive: ensure server returned JSON (sometimes SPA returns index.html)
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          const text = await res.text();
          // Try a local backend fallback (useful in dev when proxy isn't configured)
          try {
            const fallbackRes = await fetch('http://localhost:4000/api/admin/transactions');
            const fct = fallbackRes.headers.get('content-type') || '';
            if (fct.includes('application/json')) {
              const fj = await fallbackRes.json();
              if (!mounted) return;
              if (!fj.ok) throw new Error(fj.message || 'Failed to load from fallback');
              setTransactions(fj.transactions || []);
              return;
            }
          } catch {
            // ignore and continue to show friendly error below
          }

          // store a short preview (no HTML rendering) and show a concise message
          const short = text ? text.replace(/\s+/g, ' ').slice(0, 300) : '';
          if (mounted) {
            setPreview(short);
            throw new Error('Server returned non-JSON (likely the frontend index.html). Start the backend or configure the /api proxy.');
          }
        }
        const json = await res.json();
        if (!mounted) return;
        if (!json.ok) throw new Error(json.message || 'Failed to load');
        setTransactions(json.transactions || []);
      } catch (e) {
        setError(e.message || String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      {loading && <p>Loading transactions…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {error && (
        <div className="mt-2 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <button onClick={manualRetry} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Retry / Try fallback</button>
            <button onClick={() => setShowPreview(s => !s)} className="underline text-sm text-indigo-600">{showPreview ? 'Hide response preview' : 'Show response preview'}</button>
            <a target="_blank" rel="noreferrer" href="/" className="text-sm text-gray-500">Open app root</a>
          </div>
          {showPreview && preview && (
            <pre className="mt-2 p-2 bg-slate-100 rounded text-xs overflow-auto">{preview}</pre>
          )}
          <div className="mt-2 text-xs text-slate-500">
            If you're running locally, start the mock backend with:
            <pre className="mt-1 p-2 bg-slate-900 text-white rounded text-xs">cd server{String.fromCharCode(92)}node server.js</pre>
          </div>
        </div>
      )}
      {!loading && !error && (
        <table className="w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">Reference / ID</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr><td colSpan="4" className="p-4">No transactions found.</td></tr>
            )}
            {transactions.map((t) => (
              <tr key={t.id || t.reference} className="border-b last:border-0">
                <td className="p-4">{t.reference || t.id}</td>
                <td className="p-4">{t.amount ? `₦${(t.amount/100).toLocaleString()}` : '—'}</td>
                <td className="p-4">{t.status || (t.raw && t.raw.event) || 'unknown'}</td>
                <td className="p-4">{t.paidAt ? new Date(t.paidAt).toLocaleString() : (t.createdAt ? new Date(t.createdAt).toLocaleString() : '—')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
