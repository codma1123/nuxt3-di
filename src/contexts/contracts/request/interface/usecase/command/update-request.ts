import company_information from "src/contexts/contracts/request/domain/company-information";
import contract_information from "src/contexts/contracts/request/domain/contract-information";
import ManagerInformation from "src/contexts/contracts/request/domain/manager-information";
import { Nullable } from "src/core/nullable";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface UpdateRequestCommand extends Command {
  id: UUID;
  company_id: Nullable<UUID>;
  contract_id: Nullable<UUID>;
  company_information: company_information;
  contract_information: contract_information;
  manager_informations: ManagerInformation[];
}
export default interface IUpdateRequestCommandUseCase extends ICommandUseCase<UpdateRequestCommand> {}
