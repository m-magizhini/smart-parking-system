import React, { useState, useEffect } from 'react';

// ==========================================
// 1. BILLING SLOT DETAILS CONFIGURATION
// ==========================================
const initialSlots = [
  { id: 1, occupied: false, vehicleNumber: "", ownerName: "", entryTime: "" },
  { id: 2, occupied: true, vehicleNumber: "TN-07-AB-1234", ownerName: "Alex Vance", entryTime: "09/06/2026, 09:15:00 AM" },
  { id: 3, occupied: false, vehicleNumber: "", ownerName: "", entryTime: "" },
  { id: 4, occupied: false, vehicleNumber: "", ownerName: "", entryTime: "" },
  { id: 5, occupied: true, vehicleNumber: "KA-01-EF-5678", ownerName: "Elena Rostova", entryTime: "09/06/2026, 10:00:30 AM" },
  { id: 6, occupied: false, vehicleNumber: "", ownerName: "", entryTime: "" },
  { id: 7, occupied: false, vehicleNumber: "", ownerName: "", entryTime: "" },
  { id: 8, occupied: true, vehicleNumber: "DL-03-CD-9012", ownerName: "Marcus Sterling", entryTime: "09/06/2026, 10:45:12 AM" },
  { id: 9, occupied: false, vehicleNumber: "", ownerName: "", entryTime: "" },
  { id: 10, occupied: false, vehicleNumber: "", ownerName: "", entryTime: "" },
];

const initialHistory = [
  { id: 101, vehicleNumber: "MH-12-XY-4321", ownerName: "David Miller", entryTime: "09/06/2026, 07:30:00 AM", exitTime: "09/06/2026, 09:00:00 AM", duration: "1 hr 30 mins", cost: 60 },
  { id: 102, vehicleNumber: "HR-26-DQ-8811", ownerName: "Priya Sharma", entryTime: "09/06/2026, 08:15:00 AM", exitTime: "09/06/2026, 10:30:00 AM", duration: "2 hrs 15 mins", cost: 80 }
];

// ==========================================
// 2. CHECKOUT RECEIPT MODAL SUB-COMPONENT
// ==========================================
function CheckoutReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="modal-overlay">
      <div className="formal-card" style={{ background: '#ffffff', color: '#0f172a', width: '90%', maxWidth: '440px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid var(--card-border)' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#ffffff', padding: '28px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🏁</div>
          <h2 style={{ fontSize: '22px', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>Official Parking Invoice</h2>
          <p style={{ fontSize: '13px', opacity: 0.85, margin: '4px 0 0 0', fontWeight: '500' }}>Smart Parking Lot Operations System</p>
        </div>

        <div style={{ padding: '24px', backgroundColor: '#f8fafc' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px dashed #cbd5e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>🚘 Vehicle Number:</span>
              <span style={{ fontWeight: '700', fontSize: '14px' }}>{receipt.vehicleNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>👤 Owner Name:</span>
              <span style={{ fontWeight: '700', fontSize: '14px' }}>{receipt.ownerName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>📅 Checked In:</span>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>{receipt.entryTime}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>🏁 Checked Out:</span>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>{receipt.exitTime}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>⏳ Duration:</span>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>{receipt.duration}</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '16px', background: '#eff6ff', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: '#1e3a8a', fontWeight: '700', textTransform: 'uppercase' }}>Total Amount Paid</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#1e3a8a', marginTop: '4px' }}>₹{receipt.cost}</div>
            </div>
          </div>
          <button onClick={onClose} className="btn-animated" style={{ marginTop: '20px', width: '100%', padding: '14px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
            Dismiss Invoice & Clear Lane
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. LOT LAYOUT CONFIGURATION GRID
// ==========================================
function ParkingGrid({ slots }) {
  const availableCount = slots.filter(s => !s.occupied).length;

  return (
    <div className="formal-card" style={{ border: '1px solid var(--card-border)', padding: '24px', borderRadius: '16px', backgroundColor: 'var(--card-bg)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>🚗 Real-Time Lot Layout Map</h2>
      <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Available Slots: <span style={{ color: 'var(--accent-success)', fontWeight: '800' }}>{availableCount} / {slots.length}</span>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {slots.map(slot => (
          <div key={slot.id} className={`formal-card ${slot.occupied ? 'slot-card-occupied' : 'slot-card-vacant'}`} style={{ padding: '20px', borderRadius: '12px', color: '#ffffff', fontWeight: 'bold', backgroundColor: slot.occupied ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', display: 'flex', justifyContent: 'space-between' }}>
              <span>Slot #{slot.id}</span>
              <span>{slot.occupied ? '🚘' : '🟢'}</span>
            </div>
            {slot.occupied ? (
              <div style={{ marginTop: '12px', fontWeight: 'normal', fontSize: '13px', lineHeight: '1.6', opacity: 0.95 }}>
                Plate: <strong style={{ letterSpacing: '0.5px' }}>{slot.vehicleNumber}</strong> <br />
                User: {slot.ownerName} <br />
                In: <span style={{ fontSize: '11px' }}>{slot.entryTime}</span>
              </div>
            ) : (
              <div style={{ marginTop: '12px', fontWeight: '500', fontStyle: 'italic', opacity: 0.9, fontSize: '13px' }}>Vacant & Available</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. ACTION INTERACTION SCHEMAS (FORMS)
// ==========================================
function ActionForms({ onPark, onExit, slots }) {
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
      <div className="formal-card" style={{ background: 'var(--card-bg)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontWeight: '800', fontSize: '18px' }}>📥 Check-In Entering Vehicle</h3>
        <form onSubmit={handleEntrySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Vehicle Number (e.g., TN-07-1234)" value={vnum} onChange={(e) => setVnum(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <input type="text" placeholder="Owner Name" value={owner} onChange={(e) => setOwner(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            📅 Manual Entry Time (Optional):
          </label>
          <input type="datetime-local" value={entryTime} onChange={(e) => setEntryTime(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            🅿️ Select Parking Slot:
          </label>
          <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px', background: '#fff' }}>
            <option value="">Choose a free slot</option>
            {slots.filter(slot => !slot.occupied).map(slot => (
              <option key={slot.id} value={slot.id}>Slot #{slot.id}</option>
            ))}
          </select>
          <button type="submit" className="btn-animated" style={{ padding: '14px 16px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent-success) 0%, #16a34a 100%)', color: '#fff', border: 'none', fontWeight: '800', cursor: 'pointer' }}>
            ✅ Confirm Vehicle Entry
          </button>
        </form>
      </div>

      <div className="formal-card" style={{ background: 'var(--card-bg)', padding: '24px', borderRadius: '16px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--text-primary)', fontWeight: '800', fontSize: '18px' }}>📤 Check-Out Exiting Vehicle</h3>
        <form onSubmit={handleExitSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Vehicle Number to Exit (e.g., TN-07-1234)" value={exitVnum} onChange={(e) => setExitVnum(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)' }}>
            📅 Manual Exit Time (Optional):
          </label>
          <input type="datetime-local" value={exitTime} onChange={(e) => setExitTime(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', fontSize: '14px' }} />
          <button type="submit" className="btn-animated" style={{ padding: '14px 16px', borderRadius: '10px', background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', color: '#fff', border: 'none', fontWeight: '800', cursor: 'pointer' }}>
            🚗 Process Vehicle Exit
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 5. MAIN APP STATE AND LOGIC
// ==========================================
function App() {
  const [slots, setSlots] = useState(initialSlots);
  const [history, setHistory] = useState(initialHistory);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const now = new Date();
    const total = initialSlots.length;
    const occupied = initialSlots.filter(slot => slot.occupied).length;
    document.title = `Smart Parking | ${occupied}/${total} Occupied`;
  }, []);

  const calculateParkingCost = (entry, exit) => {
    const start = new Date(entry);
    const end = new Date(exit);
    const diffMs = Math.max(end - start, 0);
    const minutes = Math.ceil(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const durationText = `${hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''}` : ''}${hours > 0 && mins > 0 ? ' ' : ''}${mins > 0 ? `${mins} min${mins > 1 ? 's' : ''}` : hours > 0 ? '' : '< 1 min'}`.trim();
    const hourlyRate = 40;
    const cost = Math.ceil(minutes / 60) * hourlyRate;
    return { durationText, cost };
  };

  const parkVehicle = (slotId, vehicleNumber, ownerName, entryTime) => {
    setSlots(prev => prev.map(slot => {
      if (slot.id === Number(slotId) && !slot.occupied) {
        return { ...slot, occupied: true, vehicleNumber, ownerName, entryTime };
      }
      return slot;
    }));
  };

  const exitVehicle = (vehicleNumber, exitTime) => {
    const slot = slots.find(s => s.vehicleNumber.toUpperCase() === vehicleNumber.toUpperCase() && s.occupied);
    if (!slot) {
      alert('Vehicle not found in the parking lot!');
      return;
    }

    const entryDate = new Date(slot.entryTime);
    const exitDate = new Date(exitTime);
    const { durationText, cost } = calculateParkingCost(slot.entryTime, exitTime);
    const newHistoryItem = {
      id: Date.now(),
      vehicleNumber: slot.vehicleNumber,
      ownerName: slot.ownerName,
      entryTime: slot.entryTime,
      exitTime: new Date(exitTime).toLocaleString(),
      duration: durationText,
      cost,
    };

    setHistory(prev => [newHistoryItem, ...prev]);
    setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, occupied: false, vehicleNumber: '', ownerName: '', entryTime: '' } : s));
    setReceipt({
      vehicleNumber: slot.vehicleNumber,
      ownerName: slot.ownerName,
      entryTime: slot.entryTime,
      exitTime: new Date(exitTime).toLocaleString(),
      duration: durationText,
      cost,
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)', fontFamily: 'Inter, Arial, sans-serif', color: 'var(--text-primary)', padding: '32px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: '0 0 6px 0', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '800', color: 'var(--text-secondary)' }}>Lot Management Dashboard</p>
              <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '900', letterSpacing: '-0.8px' }}>Smart Parking System</h1>
            </div>
            <div className="formal-card" style={{ padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 25px -12px rgba(0,0,0,0.15)' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Live Occupancy</div>
              <div style={{ fontSize: '28px', fontWeight: '900', marginTop: '4px', color: 'var(--text-primary)' }}>{slots.filter(s => s.occupied).length} / {slots.length}</div>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '24px', alignItems: 'start' }}>
          <ParkingGrid slots={slots} />
          <ActionForms onPark={parkVehicle} onExit={exitVehicle} slots={slots} />
        </div>

        <section style={{ marginTop: '28px' }}>
          <div className="formal-card" style={{ background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '24px' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '800' }}>📜 Parking Exit History</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {history.map(item => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 0.7fr', gap: '12px', padding: '14px 16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700' }}>Vehicle</div>
                    <div style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{item.vehicleNumber}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700' }}>Owner</div>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{item.ownerName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700' }}>In</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.entryTime}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700' }}>Out</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.exitTime}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700' }}>Fee</div>
                    <div style={{ fontWeight: '900', color: '#0f172a' }}>₹{item.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <CheckoutReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}

export default App;
