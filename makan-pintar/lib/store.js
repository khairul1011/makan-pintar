"use client";

import { createContext, useContext, useReducer, useEffect, useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { INITIAL_STATE } from "./constants";
import { createClient } from "./supabase";

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
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  // Check auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Redirect based on auth
  useEffect(() => {
    if (authLoading) return;

    if (!user && pathname !== "/login") {
      router.replace("/login");
    } else if (user && pathname === "/login") {
      router.replace("/");
    }
  }, [user, authLoading, pathname, router]);

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

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  }, [supabase, router]);

  // Show nothing while checking auth (prevents flash)
  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>⏳ Memuat...</p>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        user,
        updateSaldo,
        addFoodEntry,
        updateSetting,
        toggleNotification,
        signOut,
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
