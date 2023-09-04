import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface UnregistCompanyCommand extends Command {
  id: UUID;
  company: CompanyInformation;
}

export default interface IRemoveContractCompanyCommandUseCase extends ICommandUseCase<UnregistCompanyCommand> {}
