import { ApprovalStatus } from "src/contexts/contracts/request/domain/approval-state";
import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
import ContractInformation from "src/contexts/contracts/request/domain/contract-information";
import ManagerInformation from "src/contexts/contracts/request/domain/manager-information";
import { Nullable } from "src/core/nullable";
import QueryModel from "src/core/query";

export default interface RequestDetail extends QueryModel {
  // 기존 업체 ID
  companyID: Nullable<UUID>;

  // 기존 계약 ID
  contractID: Nullable<UUID>;

  // 업체 정보
  companyInformation: CompanyInformation;

  // 계약 정보
  contractInformation: ContractInformation;

  // 관리자 생성 정보 목록
  managerInformations: ManagerInformation[];

  // 신청 승인 상태
  approvalStatus: ApprovalStatus;

  // 신청 일자
  timestamp: Date;
}
