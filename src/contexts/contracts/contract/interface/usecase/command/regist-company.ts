import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import CompanyInformation from "src/contexts/contracts/request/domain/company-information";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface AddContractCompanyCommand extends Command {
  id: UUID;
  company: CompanyInformation;
  company_roles: Set<CompanyRole>;
}

export interface IAddContractCompanyCommandUseCase extends ICommandUseCase<AddContractCompanyCommand> {}
