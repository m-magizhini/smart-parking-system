import React from 'react';

export default function ParkingGrid({ slots }) {
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
