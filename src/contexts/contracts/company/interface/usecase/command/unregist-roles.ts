import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface UnregistRolesCommand extends Command {
  // 업체 ID
  id: UUID;

  // 업체 역할
  roles: CompanyRole;
}

export default interface UnregistRolesCommandUseCase extends ICommandUseCase<UnregistRolesCommand> {}
