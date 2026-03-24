import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../mocks/users';
import { Invite, mockInvites } from '../mocks/invites';

interface QuizResult {
  beer: number;
  cocktail: number;
  wine: number;
  preferredCategory?: string;
  preferredAbv?: 'low' | 'medium' | 'high';
}

interface AppState {
  ageGateAccepted: boolean;
  currentUser: User | null;
  registeredUsers: User[];
  staffAuthenticated: boolean;
  quizResult: QuizResult | null;
  locationPermission: 'prompt' | 'granted' | 'denied';
  invites: Invite[];

  setAgeGateAccepted: (accepted: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  registerUser: (user: User) => void;
  setStaffAuthenticated: (auth: boolean) => void;
  setQuizResult: (result: QuizResult | null) => void;
  setLocationPermission: (status: 'prompt' | 'granted' | 'denied') => void;
  createInvite: (toUserId: string) => void;
  updateInviteStatus: (inviteId: string, status: 'accepted' | 'rejected') => void;

  clearState: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ageGateAccepted: false,
      currentUser: null,
      registeredUsers: [], // start empty for Week 2 tests
      staffAuthenticated: false,
      quizResult: null,
      locationPermission: 'prompt',
      invites: mockInvites,

      setAgeGateAccepted: (accepted) => set({ ageGateAccepted: accepted }),
      
      setCurrentUser: (user) => set({ currentUser: user }),

      registerUser: (user) => 
        set((state) => {
          if (state.registeredUsers.length >= 5) {
            return state; // prototype limit is 5
          }
          return {
            registeredUsers: [...state.registeredUsers, user],
            currentUser: user
          };
        }),

      setStaffAuthenticated: (auth) => set({ staffAuthenticated: auth }),

      setQuizResult: (result) => set({ quizResult: result }),

      setLocationPermission: (status) => set({ locationPermission: status }),

      createInvite: (toUserId: string) =>
        set((state) => {
          if (!state.currentUser) return state;
          
          const existing = state.invites.find(
            i => i.from_user_id === state.currentUser!.user_id &&
                 i.to_user_id === toUserId &&
                 i.status === 'pending'
          );
          if (existing) return state; // Deduplicate

          const newInvite: Invite = {
            invite_id: `INV_${Date.now()}`,
            from_user_id: state.currentUser.user_id,
            to_user_id: toUserId,
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          return { invites: [...state.invites, newInvite] };
        }),

      updateInviteStatus: (inviteId: string, status: 'accepted' | 'rejected') =>
        set((state) => ({
          invites: state.invites.map((inv) =>
            inv.invite_id === inviteId
              ? { ...inv, status, updated_at: new Date().toISOString() }
              : inv
          ),
        })),

      clearState: () => set({
        ageGateAccepted: false,
        currentUser: null,
        registeredUsers: [],
        staffAuthenticated: false,
        quizResult: null,
        locationPermission: 'prompt',
        invites: mockInvites,
      })
    }),
    {
      name: 'cheersbuddy-storage',
    }
  )
);
