import { Axios } from "axios";
import ContractSummary from "src/contexts/contracts/contract/domain/summary";
import IListContractsProxy from "src/contexts/contracts/contract/interface/proxy/list-contracts";
import { ListContractsQuery } from "src/contexts/contracts/contract/interface/usecase/query/list-contracts";

export default class ListContractsProxy implements IListContractsProxy {
  private client: Axios;

  constructor(client: Axios) {
    this.client = client;
  }

  async execute(query: ListContractsQuery): Promise<ContractSummary[]> {
    const response = await this.client.get("/contracats", { params: query });
    return response.data;
  }
}
