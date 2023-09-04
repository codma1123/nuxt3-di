import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
import ContractInformation from "src/contexts/contracts/request/domain/contract-information";
import ManagerInformation from "src/contexts/contracts/request/domain/manager-information";
import { Nullable } from "src/core/nullable";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface CreateRequestCommand extends Command {
  company_id: Nullable<UUID>;
  contract_id: Nullable<UUID>;
  company_information: CompanyInformation;
  contract_information: ContractInformation;
  manager_informations: ManagerInformation[];
}

export interface ICreateRequestCommandUseCase extends ICommandUseCase<CreateRequestCommand> {}
