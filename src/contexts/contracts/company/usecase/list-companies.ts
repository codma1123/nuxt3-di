import { storeToRefs } from "pinia";
import { useCompanyStore } from "src/contexts/contracts/company/company.store";
import { CompanySummary, IListCompaniesQueryUseCase } from "src/contexts/contracts/company/interface/usecase/list-companies";

export default class CreateCompanyCommandUseCase implements IListCompaniesQueryUseCase {
	public async execute(): Promise<globalThis.Ref<CompanySummary[]>> {
		return storeToRefs(useCompanyStore()).companies;
	}
}
