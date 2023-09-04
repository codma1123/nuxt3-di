import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface RegistRolesCommand extends Command {
  // 업체 ID
  id: UUID;

  // 업체 역할
  roles: CompanyRole;
}

export default interface IRegistRolesCommandUseCase extends ICommandUseCase<RegistRolesCommand> {}
