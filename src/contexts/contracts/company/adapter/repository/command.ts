import { Axios } from "axios";
import { ICompanyCommandRepository } from "src/contexts/contracts/company/interface/repository/command";
import { RegistRolesCommand } from "src/contexts/contracts/company/interface/usecase/command/regist-roles";
import { CreateCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/create-company";
import { RemoveCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/remove-company";
import { UnregistRolesCommand } from "src/contexts/contracts/company/interface/usecase/command/unregist-roles";
import { UpdateCompanyCommand } from "src/contexts/contracts/company/interface/usecase/command/update-company";

export default class CompanyCommandRepository implements ICompanyCommandRepository {
  private client: Axios;
  constructor(client: Axios) {
    this.client = client;
  }
  public async removeCompany(command: RemoveCompanyCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async addCompanyRoles(command: RegistRolesCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async removeCompanyRoles(command: UnregistRolesCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async updateCompany(command: UpdateCompanyCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async createCompany(command: CreateCompanyCommand): Promise<void> {
    const response = await this.client.post<null>("/companies", { body: command });
    if (response.status !== 200) throw new Error();
    return;
  }
}
