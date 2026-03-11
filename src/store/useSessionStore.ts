import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  sessionId: string | null;
  isCreatingSession: boolean;
  setSessionId: (sessionId: string) => void;
  setIsCreatingSession: (isCreatingSession: boolean) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      isCreatingSession: false,
      setSessionId: (sessionId) => set({ sessionId }),
      setIsCreatingSession: (isCreatingSession) => set({ isCreatingSession }),
      clearSession: () => set({ sessionId: null, isCreatingSession: false }),
    }),
    {
      name: "kma-end-user-session",
      partialize: (state) => ({ sessionId: state.sessionId }),
    }
  )
);
