import { defineStore } from "pinia";
import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
import IManagerQueryRepository from "src/contexts/contracts/manager/interface/repository/query";

interface IManagerQuertState {
  summary: ManagerSummary[];
}

export const useManagerQueryStore = defineStore<"manager", IManagerQuertState, any, IManagerQueryRepository>("manager", {
  state: () => ({
    summary: [],
  }),

  actions: {
    setSummary(setSummary) {
      this.summary = setSummary;
    },
  },
});
