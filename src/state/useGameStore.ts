import { create } from 'zustand';

interface GameState {
  // Harmony Engine
  harmonyLevel: number; // 0 to 100
  distance: number;
  soulLinkActive: boolean;

  // Shared Resources
  qualityTime: number; // Ticking clock in seconds
  financialStability: number;
  xp: number;
  level: number;
  sharedVault: number;
  teaLeaves: number;
  pearls: number;

  // Player States
  player1Position: [number, number, number];
  player2Position: [number, number, number];
  compliment1: boolean;
  compliment2: boolean;
  comboActive: boolean;

  // Mini-game State
  miniGameActive: 'sipOff' | null;
  sipProgress: [number, number]; // [player1, player2]
  brainFreeze: [number, number]; // timers per player

  // Actions
  updateHarmony: (distance: number) => void;
  addXP: (amount: number) => void;
  addFinancialStability: (amount: number) => void;
  tickQualityTime: (delta: number) => void;
  replenishQualityTime: (amount: number) => void;
  updatePlayerPosition: (player: 1 | 2, position: [number, number, number]) => void;
  triggerSoulLink: () => void;
  collectItem: (type: 'leaf' | 'pearl') => void;
  setComplimenting: (player: 1 | 2, active: boolean) => void;
  triggerMiniGame: (type: 'sipOff' | null) => void;
  sip: (player: 1 | 2) => void;
  tickMiniGame: (delta: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  harmonyLevel: 0,
  distance: 0,
  soulLinkActive: false,
  qualityTime: 300,
  financialStability: 0,
  xp: 0,
  level: 1,
  sharedVault: 0,
  teaLeaves: 0,
  pearls: 0,
  player1Position: [0, 0, 0],
  player2Position: [0, 0, 0],
  compliment1: false,
  compliment2: false,
  comboActive: false,
  miniGameActive: null,
  sipProgress: [0, 0],
  brainFreeze: [0, 0],

  updateHarmony: (distance: number) => set((state) => {
    const isClose = distance < 5;
    const newHarmony = isClose
      ? Math.min(100, state.harmonyLevel + 0.1)
      : Math.max(0, state.harmonyLevel - 0.2);

    return {
      distance,
      harmonyLevel: newHarmony,
      soulLinkActive: newHarmony === 100
    };
  }),

  addXP: (amount: number) => set((state) => {
    const newXP = state.xp + amount;
    const nextLevelXP = state.level * 1000;
    if (newXP >= nextLevelXP) {
      return { xp: newXP - nextLevelXP, level: state.level + 1 };
    }
    return { xp: newXP };
  }),

  addFinancialStability: (amount: number) => set((state) => ({
    financialStability: state.financialStability + amount,
    sharedVault: state.sharedVault + amount
  })),

  tickQualityTime: (delta: number) => set((state) => ({
    qualityTime: Math.max(0, state.qualityTime - delta)
  })),

  replenishQualityTime: (amount: number) => set((state) => ({
    qualityTime: Math.min(600, state.qualityTime + amount)
  })),

  updatePlayerPosition: (player, position) => set(() => {
    if (player === 1) return { player1Position: position };
    return { player2Position: position };
  }),

  triggerSoulLink: () => set((state) => {
    if (state.harmonyLevel === 100) {
      return { player2Position: [...state.player1Position] };
    }
    return state;
  }),

  collectItem: (type) => set((state) => {
    if (type === 'leaf') return { teaLeaves: state.teaLeaves + 1 };
    return { pearls: state.pearls + 1 };
  }),

  setComplimenting: (player, active) => set((state) => {
    const key = player === 1 ? 'compliment1' : 'compliment2';
    const newState = { ...state, [key]: active };
    const bothComplimenting = (player === 1 ? active : state.compliment1) && (player === 2 ? active : state.compliment2);

    if (bothComplimenting && !state.comboActive) {
      setTimeout(() => set({ comboActive: false }), 2000);
      return { ...newState, comboActive: true };
    }

    return newState;
  }),

  triggerMiniGame: (type) => set({
    miniGameActive: type,
    sipProgress: [0, 0],
    brainFreeze: [0, 0]
  }),

  sip: (player) => set((state) => {
    if (state.brainFreeze[player - 1] > 0) return state;

    const newProgress = [...state.sipProgress] as [number, number];
    newProgress[player - 1] = Math.min(100, newProgress[player - 1] + 5);

    const rand = Math.random();
    const newFreeze = [...state.brainFreeze] as [number, number];
    if (rand < 0.15) {
      newFreeze[player - 1] = 3;
    }

    return { sipProgress: newProgress, brainFreeze: newFreeze };
  }),

  tickMiniGame: (delta) => set((state) => ({
    brainFreeze: state.brainFreeze.map(t => Math.max(0, t - delta)) as [number, number]
  })),
}));
