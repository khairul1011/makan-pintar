"use client";

import { useState } from "react";
import Switch from "../ui/Switch";
import { formatRupiahInput } from "@/lib/utils";

export default function SettingRow({ label, value, type = "text", editable = false, isToggle = false, onSave, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize state dengan format angka jika tipenya number
  const [editValue, setEditValue] = useState(() => {
    if (type === "number") return formatRupiahInput(value);
    return value;
  });

  const handleSave = () => {
    setIsEditing(false);
    if (onSave && editValue !== value) {
      onSave(editValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  return (
    <div className="setting-row" data-editable={editable}>
      <span className="setting-label">{label}</span>
      
      {isToggle ? (
        <Switch isOn={value} onToggle={onToggle} ariaLabel={`Toggle ${label}`} />
      ) : isEditing ? (
        <div className="setting-value" style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            className="inline-edit"
            type="text"
            inputMode={type === "number" ? "numeric" : "text"}
            value={editValue}
            onChange={(e) => {
              if (type === "number") {
                setEditValue(formatRupiahInput(e.target.value));
              } else {
                setEditValue(e.target.value);
              }
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
          />
          <button className="edit-setting" type="button" onClick={handleSave}>Simpan</button>
        </div>
      ) : (
        <div className="setting-value">
          <span>{value}</span>
          {editable && (
            <button className="edit-setting" type="button" onClick={() => setIsEditing(true)}>
              Edit →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
