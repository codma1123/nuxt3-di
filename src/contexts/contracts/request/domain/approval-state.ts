export const ApprovalStatus = {
  Unchecked: "심사 필요",
  Approve: "승인됨",
  Reject: "거절됨",
} as const;

export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];
