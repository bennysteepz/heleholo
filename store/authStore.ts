import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  session: Session | null | undefined; // undefined = loading
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: undefined,

  initialize: async () => {
    const { data } = await supabase.auth.getSession();
    set({ session: data.session });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
    });
  },
}));
