export const ManagerRole = {
  Adminstrator: "운영자",
  Supervisor: "감리",
} as const;

export type ManagerRole = (typeof ManagerRole)[keyof typeof ManagerRole];
