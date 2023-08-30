import { ApprovalStatus } from "src/contexts/contracts/request/domain/approval-state";
import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
import ContractInformation from "src/contexts/contracts/request/domain/contract-information";
import ManagerInformation from "src/contexts/contracts/request/domain/manager-information";
import { Nullable } from "src/core/nullable";
import QueryModel from "src/core/query";

export default interface RequestDetail extends QueryModel {
  // 기존 업체 ID
  company_id: Nullable<UUID>;

  // 기존 계약 ID
  contract_id: Nullable<UUID>;

  // 업체 정보
  company_information: CompanyInformation;

  // 계약 정보
  contract_information: ContractInformation;

  // 관리자 생성 정보 목록
  manager_information: ManagerInformation[];

  // 신청 승인 상태
  approval_status: ApprovalStatus;

  // 신청 일자
  timestamp: Date;
}
