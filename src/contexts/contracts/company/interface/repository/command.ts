import { RegistRolesCommand } from "src/contexts/contracts/company/interface/usecase/command/regist-roles";
import { CreateCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/create-company";
import { RemoveCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/remove-company";
import { UnregistRolesCommand } from "src/contexts/contracts/company/interface/usecase/command/unregist-roles";
import { UpdateCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/update-company";
import { ICommandRepository } from "src/core/repository";

export interface ICompanyCommandRepository extends ICommandRepository {
  createCompany(command: CreateCompanyCommand): Promise<void>;
  updateCompany(command: UpdateCompanyCommand): Promise<void>;
  removeCompany(command: RemoveCompanyCommand): Promise<void>;
  addCompanyRoles(command: RegistRolesCommand): Promise<void>;
  removeCompanyRoles(command: UnregistRolesCommand): Promise<void>;
}
