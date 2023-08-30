import { InjectionKey } from "nuxt/dist/app/compat/capi";
import IRequestDetailPresenter from "src/contexts/contracts/request/interface/presenter/detail";
import IRequestSummaryPresenter from "src/contexts/contracts/request/interface/presenter/summary";

export const dependencyMap = {
  IRequestDetailPresenter: Symbol() as InjectionKey<IRequestDetailPresenter>,
  IRequestSummaryPresenter: Symbol() as InjectionKey<IRequestSummaryPresenter>,
};
