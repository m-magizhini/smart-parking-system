import React, { useState } from 'react';

export default function ActionForms({ onPark, onExit, slots }) {
  const [vnum, setVnum] = useState('');
  const [owner, setOwner] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitVnum, setExitVnum] = useState('');
  const [exitTime, setExitTime] = useState('');

  const handleEntrySubmit = (e) => {
    e.preventDefault();
    if (!vnum || !owner || !selectedSlot) {
      alert("Please fill in all vehicle entry details!");
      return;
    }
    let formattedEntry = entryTime ? new Date(entryTime).toLocaleString() : new Date().toLocaleString();
    onPark(selectedSlot, vnum.toUpperCase(), owner, formattedEntry);
    setVnum(''); setOwner(''); setSelectedSlot(''); setEntryTime('');
  };

  const handleExitSubmit = (e) => {
    e.preventDefault();
    if (!exitVnum) {
      alert("Please enter a vehicle number to exit!");
      return;
    }
    let formattedExit = exitTime ? new Date(exitTime).toLocaleString() : new Date().toLocaleString();
    onExit(exitVnum.toUpperCase(), formattedExit);
    setExitVnum(''); setExitTime('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 📥 VEHICLE ENTRY FORM MODULE */}
      <div className="formal-card" style={{ background: 'var(--card-bg)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontWeight: '800', fontSize: '18px' }}>📥 Check-In Entering Vehicle</h3>
        <form onSubmit={handleEntrySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Vehicle Number (e.g., TN-07-1234)" value={vnum} onChange={(e) => setVnum(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwner(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            📅 Manual Entry Time (Optional):
            <input type="datetime-local" value={entryTime} onChange={(e) => setEntryTime(e.target.value)} style={{ display: 'block', width: '100%', marginTop: '6px', padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          </label>
          <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', backgroundColor: '#fff', fontSize: '14px' }}>
            <option value="">-- Choose an Available Slot --</option>
            {slots.filter(s => !s.occupied).map(s => <option key={s.id} value={s.id}>Slot Number {s.id}</option>)}
          </select>
          <button type="submit" className="btn-animated btn-success-animated" style={{ padding: '14px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>Assign & Park Vehicle</button>
        </form>
      </div>

      {/* 🏁 VEHICLE EXIT FORM MODULE */}
      <div className="formal-card" style={{ background: 'var(--card-bg)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontWeight: '800', fontSize: '18px' }}>🏁 Check-Out Exiting Vehicle</h3>
        <form onSubmit={handleExitSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Enter Vehicle Number to Exit" value={exitVnum} onChange={(e) => setExitVnum(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            📅 Manual Exit Time (Optional):
            <input type="datetime-local" value={exitTime} onChange={(e) => setExitTime(e.target.value)} style={{ display: 'block', width: '100%', marginTop: '6px', padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          </label>
          <button type="submit" className="btn-animated btn-danger-animated" style={{ padding: '14px', background: 'var(--accent-danger)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>Process Checkout & Bill</button>
        </form>
      </div>
    </div>
  );
}
