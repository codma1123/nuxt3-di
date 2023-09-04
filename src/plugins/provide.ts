import client from "src/contexts/contracts/company/adapter/client";
import ContractSummaryPresenter from "src/contexts/contracts/contract/adapter/presenter/summary";
import ListContractsProxy from "src/contexts/contracts/contract/adapter/proxy/list-contracts";
import ContractQueryRepository from "src/contexts/contracts/contract/adapter/repository/query";
import ListContractsQueryUseCase from "src/contexts/contracts/contract/adapter/usecase/query/list-contracts";
import RequestDetailPresenter from "src/contexts/contracts/request/adapter/presenter/detail";
import RequestSummaryPresenter from "src/contexts/contracts/request/adapter/presenter/summary";
import { dependencyMap } from "src/contexts/contracts/request/dependency";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      // [dependencyMap.IRequestDetailPresenter]: new RequestDetailPresenter(),
      // [dependencyMap.IRequestSummaryPresenter]: new RequestSummaryPresenter(),
      // [dependencyMap.IContractSummaryPresenter]: new ContractSummaryPresenter(),
      // [dependencyMap.IListContractsQueryUseCase]: new ListContractsQueryUseCase(new ContractQueryRepository(), new ListContractsProxy(client)),
    },
  };
});
