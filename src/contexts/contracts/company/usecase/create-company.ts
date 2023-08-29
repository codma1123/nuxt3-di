import { CreateCompanyCommand, ICreateCompanyCommandUseCase } from "src/contexts/contracts/company/interface/usecase/create-company";

export default class CreateCompanyCommandUseCase implements ICreateCompanyCommandUseCase {
	public async execute(command: CreateCompanyCommand): Promise<void> {
		return;
	}
}
