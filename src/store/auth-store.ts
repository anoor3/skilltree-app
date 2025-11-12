"use client";

import { create } from "zustand";
import type { UserProfile } from "@/lib/types";
import { userProfile as mockProfile } from "@/lib/mock-data";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  signInWithMock: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: mockProfile,
  isAuthenticated: true,
  signInWithMock: () => set({ user: mockProfile, isAuthenticated: true }),
  signOut: () => set({ user: null, isAuthenticated: false }),
}));
