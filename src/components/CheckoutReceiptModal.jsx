import React from 'react';

export default function CheckoutReceiptModal({ receipt, onClose }) {
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', paddingBottom: '10px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>🎟️ Ticket ID:</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>#{receipt.id}</span>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px', padding: '16px', background: '#eff6ff', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: '#1e3a8a', fontWeight: '700', textTransform: 'uppercase' }}>Total Amount Paid</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#1e3a8a', marginTop: '4px' }}>₹{receipt.cost}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ marginTop: '20px', width: '100%', padding: '14px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
            Dismiss Invoice & Clear Lane
          </button>
        </div>
      </div>
    </div>
  );
}
