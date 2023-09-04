export const AmountUnit = {
  Cubic: "입방미터(m3)",
  Ton: "톤(t)",
} as const;

export type AmountUnit = (typeof AmountUnit)[keyof typeof AmountUnit];
