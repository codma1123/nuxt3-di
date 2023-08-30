<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
  import IRequestDetailPresenter from "src/contexts/contracts/request/interface/presenter/detail";
  import IRequestSummaryPresenter from "src/contexts/contracts/request/interface/presenter/summary";
  import RequestDetailPresenter from "src/contexts/contracts/request/adapter/presenter/detail";
  import RequestSummaryPresenter from "src/contexts/contracts/request/adapter/presenter/summary";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";

  provide<IRequestDetailPresenter>(dependencyMap.IRequestDetailPresenter, new RequestDetailPresenter());
  provide<IRequestSummaryPresenter>(dependencyMap.IRequestSummaryPresenter, new RequestSummaryPresenter());
</script>
