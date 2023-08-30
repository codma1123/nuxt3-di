export const CompanyRole = {
  Client: "발주사",
  Supervisory: "감리업체",
  Builder: "건설사",
  Carrier: "운반업체",
  Executor: "수행사",
  Exhauster: "배출자",
  Processor: "처리자",
  Provider: "서비스 제공사",
} as const;
export type CompanyRole = (typeof CompanyRole)[keyof typeof CompanyRole];
