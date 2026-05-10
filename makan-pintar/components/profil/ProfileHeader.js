"use client";

import { useApp } from "@/lib/store";
import { getDailyBudget, getMode } from "@/lib/utils";
import { MODE_CONFIG } from "@/lib/constants";

export default function ProfileHeader() {
  const { state } = useApp();
  const budgetHarian = getDailyBudget(state.saldoMakan, state.hariKeKiriman);
  const mode = getMode(budgetHarian, MODE_CONFIG);

  return (
    <header className="profile-header">
      <div className="avatar" aria-hidden="true">MK</div>
      <div>
        <h2 className="page-title">Makan Pintar User</h2>
        <span className="page-subtitle">Mahasiswa · Mode {mode.label} {mode.emoji}</span>
      </div>
    </header>
  );
}
