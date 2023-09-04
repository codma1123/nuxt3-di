import { Axios } from "axios";
import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
import IListManagersProxy from "src/contexts/contracts/manager/interface/proxy/list-managers";
import { ListManagersQuery } from "src/contexts/contracts/manager/interface/usecase/query/list-managers";

export default class ListManagersProxy implements IListManagersProxy {
  private client: Axios;

  constructor(client: Axios) {
    this.client = client;
  }
  async execute(query: ListManagersQuery): Promise<ManagerSummary[]> {
    const response = await this.client.get<ManagerSummary[]>("/managers", { params: query });
    return response.data;
  }
}
