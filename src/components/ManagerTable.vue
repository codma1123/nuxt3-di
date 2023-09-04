<template>
  <RefreshableTable
    :loading="loading"
    @on-refresh="onRefreshClick"
  >
    <template #head>
      <th class="text-left">이름</th>
      <th class="text-left">전화번호</th>
      <th class="text-left">역할</th>
    </template>
    <template #body>
      <tr
        v-for="(item, i) in managers"
        :key="i"
      >
        <td>
          {{ item.name }}
        </td>
        <td>
          {{ item.phone_number }}
        </td>
        <td>
          <span
            v-for="(role, j) in item.roles"
            :key="j"
          >
            {{ role }}
          </span>
        </td>
        <td class="text-right">
          <VBtn
            icon
            @click="onRemoveClick"
          >
            <VIcon class="text-red-darken-4">mdi-delete</VIcon>
          </VBtn>
          <VBtn
            icon
            @click="onEditClick"
          >
            <VIcon class="text-green">mdi-account-edit</VIcon>
          </VBtn>
        </td>
      </tr>
    </template>
  </RefreshableTable>
</template>

<script setup lang="ts">
  import IManagerSummaryPresenter from "src/contexts/contracts/manager/interface/presenter/summary";
  import IListManagersQueryUseCase from "src/contexts/contracts/manager/interface/usecase/query/list-managers";
  import { dependencyMap } from "src/contexts/contracts/request/dependency";

  const loading = ref<boolean>(false);
  const managerSummaryPresenter = inject(dependencyMap.IManagerSummaryPresenter) as IManagerSummaryPresenter;
  const managers = computed(() => managerSummaryPresenter.getState());
  const listManagersUseCase = inject(dependencyMap.IListManagersQueryUseCase) as IListManagersQueryUseCase;

  const onRefreshClick = async () => {
    loading.value = true;
    try {
      await listManagersUseCase.execute({});
    } catch (e) {
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const onRemoveClick = () => {};

  const onEditClick = () => {};
</script>

<style scoped></style>
