import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import TransferAmount from "src/contexts/contracts/contract/domain/transfer-amount";
import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
import { ICommandUseCase } from "src/core/usecase";

export interface CreateContractCommand {
  // 공사명
  construction_name: string;

  // 발주처 업체 ID
  client_company_id: UUID;

  // 착공일
  construction_start_date: Date;

  // 준공일
  construction_end_date: Date;

  // 운반 시작일
  transfer_start_date: Date;

  // 운반 종료일
  transfer_end_date: Date;

  // 총 예상 물량
  expected_total_transfer_amount: TransferAmount;

  // 계약 참여 업체 목록
  contract_in_companies: {
    company: CompanyInformation[];
    company_roles: Set<CompanyRole>;
  };
}

export default interface ICreateContractCommandUseCase extends ICommandUseCase<CreateContractCommand> {}
