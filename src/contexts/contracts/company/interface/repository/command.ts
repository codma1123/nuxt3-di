import { CreateCompanyCommand } from "src/contexts/contracts/company/interface/usecase/create-company";
import { ICommandRepository } from "src/core/repository";

export interface ICompanyCommandRepository extends ICommandRepository {
	createCompany(command: CreateCompanyCommand): Promise<void>;
}
