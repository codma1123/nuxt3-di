import { storeToRefs } from "pinia";
import { ICompanyQueryStore, useCompanyQueryStore } from "src/contexts/contracts/company/adapter/store";
import CompanySummary from "src/contexts/contracts/company/domain/summary";
import ICompanySummaryPresenter from "src/contexts/contracts/company/interface/presenter/summary";

export default class CompanySummaryPresenter implements ICompanySummaryPresenter {
	private store: ICompanyQueryStore = useCompanyQueryStore();
	public getState(): globalThis.Ref<CompanySummary[]> {
		return storeToRefs(this.store).summary;
	}
}
