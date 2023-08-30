import { Axios } from "axios";
import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/remove-request";
import { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";

export class RequestCommandRepository implements IRequestCommandRepository {
  private client: Axios;

  constructor(client: Axios) {
    this.client = client;
  }

  public async createRequest(command: CreateRequestCommand): Promise<void> {
    const response = await this.client.post("/requests", { body: command });
    if (response.status !== 200) throw new Error();
    return;
  }

  public async removeRequest(command: RemoveRequestCommand): Promise<void> {
    const response = await this.client.delete(`/requests/${command.id}`);
    if (response.status !== 200) throw new Error();
    return;
  }

  public async updateRequest(command: UpdateRequestCommand): Promise<void> {
    const response = await this.client.put(`/requests/${command.company_id}`, { body: command });
    if (response.status !== 200) throw new Error();
    return;
  }
}
