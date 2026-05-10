"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/lib/store";
import { formatRupiah } from "@/lib/utils";

export default function SaldoModal({ isOpen, onClose }) {
  const { state, updateSaldo } = useApp();
  const [newSaldo, setNewSaldo] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNewSaldo(state.saldoMakan.toString());
    }
  }, [isOpen, state.saldoMakan]);

  const handleSave = () => {
    const val = Number(newSaldo);
    if (Number.isFinite(val) && val >= 0) {
      updateSaldo(val);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose} aria-hidden={!isOpen}>
      <section 
        className="modal-card" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modalTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title" id="modalTitle">Update saldo makan</h2>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Tutup modal">✕</button>
        </div>
        <div className="current-balance">
          <span>Saldo sekarang</span>
          <strong>{formatRupiah(state.saldoMakan)}</strong>
        </div>
        <label className="input-label" htmlFor="newSaldo">Saldo baru</label>
        <input 
          className="saldo-input" 
          id="newSaldo" 
          type="number" 
          min="0" 
          step="1000" 
          inputMode="numeric" 
          placeholder="Contoh: 420000"
          value={newSaldo}
          onChange={(e) => setNewSaldo(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="save-button" type="button" onClick={handleSave}>Simpan saldo</button>
      </section>
    </div>
  );
}
