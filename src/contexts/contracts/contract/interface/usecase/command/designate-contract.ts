import { Command, ICommandUseCase } from "src/core/usecase";
import CompanyInformation from "src/contexts/contracts/request/domain/company-information";

export interface DesignateContractCommand extends Command {
  id: UUID;
  company: CompanyInformation;
}

export default interface IDesignateContractCommandUseCase extends ICommandUseCase<DesignateContractCommand> {}
