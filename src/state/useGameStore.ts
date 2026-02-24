import { create } from 'zustand';

export interface GameState {
  // Stats
  focusLevel: number; // Replaces Harmony for single player
  qualityTime: number;
  xp: number;
  level: number;
  teaLeaves: number;
  pearls: number;

  // Scene & Character State
  scene: 'landing' | 'playing';
  selectedCharacter: 'edgar' | 'kyla' | null;

  // Player State
  playerPosition: [number, number, number];
  isInteracting: boolean;

  // Mini-game State
  miniGameActive: 'sipOff' | null;
  sipProgress: number;
  brainFreeze: number;

  // Actions
  setScene: (scene: 'landing' | 'playing') => void;
  setCharacter: (char: 'edgar' | 'kyla') => void;
  updateFocus: (delta: number) => void;
  addXP: (amount: number) => void;
  updatePlayerPosition: (pos: [number, number, number]) => void;
  setInteracting: (val: boolean) => void;
  collectItem: (type: 'leaf' | 'pearl') => void;
  replenishTime: (amount: number) => void;
  triggerMiniGame: (type: 'sipOff' | null) => void;
  sip: () => void;
  tickMiniGame: (delta: number) => void;
  tickGame: (delta: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  focusLevel: 50,
  qualityTime: 300,
  xp: 0,
  level: 1,
  teaLeaves: 0,
  pearls: 0,
  scene: 'landing',
  selectedCharacter: null,
  playerPosition: [0, 0, 0],
  isInteracting: false,
  miniGameActive: null,
  sipProgress: 0,
  brainFreeze: 0,

  setScene: (scene) => set({ scene }),
  setCharacter: (selectedCharacter) => set({ selectedCharacter }),

  updateFocus: (delta) => set((state) => ({
    focusLevel: Math.max(0, Math.min(100, state.focusLevel + delta))
  })),

  addXP: (amount) => set((state) => {
    const newXP = state.xp + amount;
    const nextLevelXP = state.level * 1000;
    if (newXP >= nextLevelXP) {
      return { xp: newXP - nextLevelXP, level: state.level + 1 };
    }
    return { xp: newXP };
  }),

  updatePlayerPosition: (pos) => set({ playerPosition: pos }),
  setInteracting: (isInteracting) => set({ isInteracting }),

  collectItem: (type) => set((state) => ({
    teaLeaves: type === 'leaf' ? state.teaLeaves + 1 : state.teaLeaves,
    pearls: type === 'pearl' ? state.pearls + 1 : state.pearls,
    xp: state.xp + 50
  })),

  replenishTime: (amount) => set((state) => ({
    qualityTime: Math.min(300, state.qualityTime + amount)
  })),

  triggerMiniGame: (type) => set({
    miniGameActive: type,
    sipProgress: 0,
    brainFreeze: 0
  }),

  sip: () => set((state) => {
    if (state.brainFreeze > 0) return state;
    const newProgress = Math.min(100, state.sipProgress + 5);
    let newFreeze = state.brainFreeze;
    if (Math.random() > 0.8) newFreeze = 2; // 2 seconds brain freeze
    return { sipProgress: newProgress, brainFreeze: newFreeze };
  }),

  tickMiniGame: (delta) => set((state) => ({
    brainFreeze: Math.max(0, state.brainFreeze - delta)
  })),

  tickGame: (delta) => set((state) => {
    if (state.scene !== 'playing') return state;
    return {
      qualityTime: Math.max(0, state.qualityTime - delta)
    };
  })
}));
