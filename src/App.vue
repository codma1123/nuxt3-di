<template>
  <NuxtLayout>
    <SlideError />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import SlideError from "src/components/error/SlideError.vue";
  import IRequestDetailPresenter from "src/contexts/contracts/request/interface/presenter/detail";
  import IRequestSummaryPresenter from "src/contexts/contracts/request/interface/presenter/summary";
  import RequestDetailPresenter from "src/contexts/contracts/request/adapter/presenter/detail";
  import RequestSummaryPresenter from "src/contexts/contracts/request/adapter/presenter/summary";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";
  import { ICreateRequestCommandUseCase } from "src/contexts/contracts/request/interface/usecase/command/create-request";
  import { CreateRequestCommandUseCase } from "src/contexts/contracts/request/adapter/usecase/command/create-request";
  import { RequestCommandRepository } from "src/contexts/contracts/request/adapter/repository/command";
  import client from "src/contexts/contracts/request/adapter/client";
  import ICompanyDetailPresenter from "src/contexts/contracts/company/interface/presenter/detail";
  import CompanyDetailPresenter from "src/contexts/contracts/company/adapter/presenter/detail";
  import ICompanySummaryPresenter from "src/contexts/contracts/company/interface/presenter/summary";
  import CompanySummaryPresenter from "src/contexts/contracts/company/adapter/presenter/summary";
  import IContractSummaryPresenter from "src/contexts/contracts/contract/interface/presenter/summary";
  import ContractSummaryPresenter from "src/contexts/contracts/contract/adapter/presenter/summary";
  import ICreateManagerCommandUseCase from "src/contexts/contracts/manager/interface/usecase/command/create-manager";
  import CreateManagerCommandUseCase from "src/contexts/contracts/manager/adapter/usecase/command/create-manager";
  import ManagerCommandRepository from "src/contexts/contracts/manager/adapter/repository/command";
  import IListManagersQueryUseCase from "src/contexts/contracts/manager/interface/usecase/query/list-managers";
  import ListManagersQueryUseCase from "src/contexts/contracts/manager/adapter/usecase/query/list-managers";
  import ManagerQueryRepository from "src/contexts/contracts/manager/adapter/repository/query";
  import ListManagersProxy from "src/contexts/contracts/manager/adapter/proxy/list-managers";
  import IManagerSummaryPresenter from "src/contexts/contracts/manager/interface/presenter/summary";
  import ManagerSummaryPresenter from "src/contexts/contracts/manager/adapter/presenter/summary";

  import CompanyQueryRepository from "src/contexts/contracts/company/adapter/repository/query";
  import ListCompaniesProxy from "src/contexts/contracts/company/adapter/proxy/list-companies";
  import { IListContractsQueryUseCase } from "src/contexts/contracts/contract/interface/usecase/query/list-contracts";
  import ListContractsQueryUseCase from "src/contexts/contracts/contract/adapter/usecase/query/list-contracts";
  import ContractQueryRepository from "src/contexts/contracts/contract/adapter/repository/query";
  import ListContractsProxy from "src/contexts/contracts/contract/adapter/proxy/list-contracts";
  import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
  import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
  import ListCompaniesQueryUseCase from "src/contexts/contracts/company/adapter/usecase/query/list-companies";
  import { IListCompaniesQueryUseCase } from "src/contexts/contracts/company/interface/usecase/query/list-companies";
  import { ICreateCompanyCommandUseCase } from "src/contexts/contracts/company/interface/usecase/command/create-company";
  import CreateCompanyCommandUseCase from "src/contexts/contracts/company/adapter/usecase/command/create-company";
  import CompanyCommandRepository from "src/contexts/contracts/company/adapter/repository/command";
  import ICreateContractCommandUseCase from "src/contexts/contracts/contract/interface/usecase/command/create-contract";
  import CreateContractCommandUseCase from "src/contexts/contracts/contract/adapter/usecase/command/create-contract";
  import ContractCommandRepository from "src/contexts/contracts/contract/adapter/repository/command";

  class FakeManagerSummaryPresenter implements IManagerSummaryPresenter {
    getState(): ManagerSummary[] {
      return [
        {
          name: "이준하",
          phone_number: "010-9922-0335",
          roles: new Set<ManagerRole>(["감리"]),
        },
        {
          name: "백세종",
          phone_number: "010-9922-0335",
          roles: new Set<ManagerRole>(["감리"]),
        },
        {
          name: "박소민",
          phone_number: "010-9922-0335",
          roles: new Set<ManagerRole>(["감리"]),
        },
        {
          name: "이준하",
          phone_number: "010-9922-0335",
          roles: new Set<ManagerRole>(["감리"]),
        },
        {
          name: "백세종",
          phone_number: "010-9922-0335",
          roles: new Set<ManagerRole>(["감리"]),
        },
        {
          name: "박소민",
          phone_number: "010-9922-0335",
          roles: new Set<ManagerRole>(["감리"]),
        },
      ];
    }
  }

  // request
  provide<ICreateRequestCommandUseCase>(dependencyMap.ICreateRequestCommandUseCase, new CreateRequestCommandUseCase(new RequestCommandRepository(client)));
  provide<ICompanyDetailPresenter>(dependencyMap.ICompanyDetailPresenter, new CompanyDetailPresenter());
  provide<IRequestDetailPresenter>(dependencyMap.IRequestDetailPresenter, new RequestDetailPresenter());
  provide<IRequestSummaryPresenter>(dependencyMap.IRequestSummaryPresenter, new RequestSummaryPresenter());

  // company
  provide<ICompanySummaryPresenter>(dependencyMap.ICompanySummaryPresenter, new CompanySummaryPresenter());
  provide<IListCompaniesQueryUseCase>(dependencyMap.IListCompaniesQueryUseCase, new ListCompaniesQueryUseCase(new CompanyQueryRepository(), new ListCompaniesProxy(client)));
  provide<ICreateCompanyCommandUseCase>(dependencyMap.ICreateCompanyCommandUseCase, new CreateCompanyCommandUseCase(new CompanyCommandRepository(client)));

  // contract
  provide<IContractSummaryPresenter>(dependencyMap.IContractSummaryPresenter, new ContractSummaryPresenter());
  provide<ICreateContractCommandUseCase>(dependencyMap.ICreateContractCommandUseCase, new CreateContractCommandUseCase(new ContractCommandRepository()));
  provide<IListContractsQueryUseCase>(dependencyMap.IListContractsQueryUseCase, new ListContractsQueryUseCase(new ContractQueryRepository(), new ListContractsProxy(client)));

  // manager
  provide<ICreateManagerCommandUseCase>(dependencyMap.ICreateManagerCommandUseCase, new CreateManagerCommandUseCase(new ManagerCommandRepository(client)));
  provide<IListManagersQueryUseCase>(dependencyMap.IListManagersQueryUseCase, new ListManagersQueryUseCase(new ManagerQueryRepository(), new ListManagersProxy(client)));
  provide<IManagerSummaryPresenter>(dependencyMap.IManagerSummaryPresenter, new FakeManagerSummaryPresenter());
</script>
