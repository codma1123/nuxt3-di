import { Axios } from "axios";
import { ICompanyCommandRepository } from "src/contexts/contracts/company/interface/repository/command";
import { CreateCompanyCommand } from "src/contexts/contracts/company/interface/usecase/create-company";

export default class CompanyCommandRepository implements ICompanyCommandRepository {
	private client: Axios;
	constructor(client: Axios) {
		this.client = client;
	}
	public async createCompany(command: CreateCompanyCommand): Promise<void> {
		const response = await this.client.post<null>("/companies", { body: command });
		if (response.status === 200) throw new Error();
		return;
	}
}
