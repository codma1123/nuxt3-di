import { Axios } from "axios";
import IManagerCommandRepository from "src/contexts/contracts/manager/interface/repository/commad";
import { CreateManagerCommand } from "src/contexts/contracts/manager/interface/usecase/command/create-manager";

export default class ManagerCommandRepository implements IManagerCommandRepository {
  private client: Axios;

  constructor(client: Axios) {
    this.client = client;
  }

  async createManager(command: CreateManagerCommand): Promise<void> {
    await this.client.post("", { body: command });
  }
}
