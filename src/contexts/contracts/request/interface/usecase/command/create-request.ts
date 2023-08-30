import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
import ContractInformation from "src/contexts/contracts/request/domain/contract-information";
import ManagerInformation from "src/contexts/contracts/request/domain/manager-information";
import { Nullable } from "src/core/nullable";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface CreateRequestCommand extends Command {
  companyID: Nullable<UUID>;
  contractID: Nullable<UUID>;
  companyInformation: CompanyInformation;
  contractInformation: ContractInformation;
  managerInformations: ManagerInformation[];
}

export interface ICreateRequestCommandUseCase extends ICommandUseCase<CreateRequestCommand> {}
