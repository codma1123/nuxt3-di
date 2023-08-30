import { ApprovalStatus } from "src/contexts/contracts/request/interface/domain/approval-state";

export default interface RequestSummary {
  // 공사명
  construction_name: string;

  // 업체명
  company_name: string;

  // 담당자 이메일
  manager_email: string;

  // 담당자 전화번호
  manager_phone_number: string;

  // 승인 상태
  approval_status: ApprovalStatus;

  // 신청 일자
  timestamp: Date;
}
