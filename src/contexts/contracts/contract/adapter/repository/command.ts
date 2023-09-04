import IContractCommandRepository from "src/contexts/contracts/contract/interface/repository/command";
import { CreateContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/create-contract";
import { RemoveContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/remove-contract";
import { UpdateContractCommand } from "src/contexts/contracts/contract/interface/usecase/command/update-contract";

export default class ContractCommandRepository implements IContractCommandRepository {
  createContract(command: CreateContractCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeContract(command: RemoveContractCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateContract(command: UpdateContractCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
