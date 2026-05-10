"use client";

import { useApp } from "@/lib/store";
import { formatRupiah } from "@/lib/utils";
import GlassCard from "../ui/GlassCard";

export default function FoodLog() {
  const { state } = useApp();
  
  // Format today's date dynamically or use static for demo
  const todayTitle = "Log Hari Ini — Senin, 23 Juni";

  return (
    <GlassCard className="card-pad quick-actions-panel">
      <div className="section-header">
        <h2 className="section-title">{todayTitle}</h2>
        <span className="section-note">{formatRupiah(state.todaySpent)}</span>
      </div>
      
      {state.todayEntries.length > 0 ? (
        <div className="food-list">
          {state.todayEntries.map((entry, idx) => (
            <div key={idx} className="food-entry">
              <div className="food-emoji" aria-hidden="true">{entry.emoji}</div>
              <div>
                <p className="food-name">{entry.name}</p>
                <div className="food-meta">
                  <span className="meal-badge">{entry.meal}</span>
                  <span>~{entry.calories} kkal</span>
                </div>
              </div>
              <strong className="food-price">{formatRupiah(entry.price)}</strong>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ display: "block" }}>
          <span aria-hidden="true">📷</span>
          Belum ada log hari ini
        </div>
      )}
      
      <button className="primary-cta" type="button">📷 Foto Makanan</button>
    </GlassCard>
  );
}
