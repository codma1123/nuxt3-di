import { Axios } from "axios";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import IListCompaniesProxy from "src/contexts/contracts/company/interface/proxy/list-companies";
import { ListCompaniesQuery } from "src/contexts/contracts/company/interface/usecase/list-companies";

export default class ListCompaniesProxy implements IListCompaniesProxy {
	private client: Axios;
	constructor(client: Axios) {
		this.client = client;
	}
	public async execute(query: ListCompaniesQuery): Promise<CompanySummary[]> {
		const response = await this.client.get<CompanySummary[]>("/contracts", { params: query });
		if (response.status !== 200) throw new Error();
		return response.data;
	}
}
