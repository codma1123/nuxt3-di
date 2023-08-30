<template>
  <div>
    <h1>Index Page</h1>
  </div>
  <div>
    <div class="detail">detail: {{ detail }}</div>
    <div>summary: {{ summary }}</div>
  </div>
</template>

<script setup lang="ts">
  import { dependencyMap } from "src/contexts/contracts/request/dependency";
  import IRequestDetailPresenter from "src/contexts/contracts/request/interface/presenter/detail";
  import IRequestSummaryPresenter from "src/contexts/contracts/request/interface/presenter/summary";

  const detailPresenter = inject(dependencyMap.IRequestDetailPresenter) as IRequestDetailPresenter;
  const summaryPresenter = inject(dependencyMap.IRequestSummaryPresenter) as IRequestSummaryPresenter;

  const detail = computed(() => detailPresenter.getState());
  const summary = computed(() => summaryPresenter.getState());
</script>
