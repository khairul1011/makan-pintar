"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { INITIAL_STATE } from "./constants";
import { loadState, saveState } from "./storage";

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case "UPDATE_SALDO":
      return { ...state, saldoMakan: action.payload };
    case "ADD_FOOD_ENTRY":
      return {
        ...state,
        todayEntries: [...state.todayEntries, action.payload],
        todaySpent: state.todaySpent + action.payload.price,
      };
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: { ...state.notifications, ...action.payload },
      };
    case "UPDATE_SETTING":
      return { ...state, [action.payload.key]: action.payload.value };
    case "HYDRATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      dispatch({ type: "HYDRATE", payload: saved });
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const updateSaldo = useCallback((saldo) => {
    dispatch({ type: "UPDATE_SALDO", payload: saldo });
  }, []);

  const addFoodEntry = useCallback((entry) => {
    dispatch({ type: "ADD_FOOD_ENTRY", payload: entry });
  }, []);

  const updateSetting = useCallback((key, value) => {
    dispatch({ type: "UPDATE_SETTING", payload: { key, value } });
  }, []);

  const toggleNotification = useCallback((key) => {
    dispatch({
      type: "SET_NOTIFICATIONS",
      payload: { [key]: !state.notifications[key] },
    });
  }, [state.notifications]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        updateSaldo,
        addFoodEntry,
        updateSetting,
        toggleNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
