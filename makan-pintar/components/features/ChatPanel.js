"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/store";
import { formatRupiah, getDailyBudget } from "@/lib/utils";

export default function ChatPanel({ isOpen, onClose }) {
  const { state } = useApp();
  const [messages, setMessages] = useState([
    { type: "user", text: "worth it gak beli ayam geprek 25rb?" },
    { 
      type: "ai", 
      text: `Budget kamu hari ini ${formatRupiah(getDailyBudget(state.saldoMakan, state.hariKeKiriman))}. Kalau beli itu sisa Rp 10.000 buat makan berikutnya. Mau gue cariin alternatif yang lebih murah?` 
    },
    { type: "user", text: "cariin dong" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { type: "ai", text: "Oke, gue bantu hitung yang paling masuk akal buat budget hari ini." }
      ]);
    }, 450);
  };

  return (
    <>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <aside className={`chat-panel ${isOpen ? "open" : ""}`} aria-label="Panel chat AI" aria-hidden={!isOpen}>
        <header className="chat-header">
          <h2 className="chat-title">💬 Ngobrol sama AI</h2>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Tutup chat">✕</button>
        </header>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <button className="icon-button" type="button" aria-label="Kirim foto makanan">📷</button>
          <input 
            className="chat-input" 
            type="text" 
            placeholder="Tulis pesan..." 
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="send-button" type="submit">Kirim</button>
        </form>
      </aside>
    </>
  );
}
