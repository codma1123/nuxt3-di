import { Axios } from "axios";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import IGetRequestProxy from "src/contexts/contracts/request/interface/proxy/get-request";
import { GetRequestQuery } from "src/contexts/contracts/request/interface/usecase/query/get-requet";

export default class GetRequestProxy implements IGetRequestProxy {
  private client: Axios;

  constructor(client: Axios) {
    this.client = client;
  }

  public async execute(query: GetRequestQuery): Promise<RequestDetail> {
    const response = await this.client.get<RequestDetail>(`/requests/${query.id}`);
    return response.data;
  }
}
