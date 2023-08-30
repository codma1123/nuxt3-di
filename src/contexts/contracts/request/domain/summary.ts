import { ApprovalStatus } from "src/contexts/contracts/request/domain/approval-state";

export default interface RequestSummary {
  // 공사명
  constructionName: string;

  // 업체명
  companyName: string;

  // 담당자 이메일
  managerEmail: string;

  // 담당자 전화번호
  managerPhoneNumber: string;

  // 승인 상태
  approvalStatus: ApprovalStatus;

  // 신청 일자
  timestamp: Date;
}
