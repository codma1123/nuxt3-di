import { Axios } from "axios";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import IListRequestsProxy from "src/contexts/contracts/request/interface/proxy/list-requests";
import { ListRequestsQuery } from "src/contexts/contracts/request/interface/usecase/query/list-requests";

export default class ListRequestsProxy implements IListRequestsProxy {
  private client: Axios;

  constructor(client: Axios) {
    this.client = client;
  }

  public async execute(query: ListRequestsQuery): Promise<RequestSummary[]> {
    const response = await this.client.get<RequestSummary[]>("/requests", { params: query });
    return response.data;
  }
}
