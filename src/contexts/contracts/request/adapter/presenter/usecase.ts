import { CreateRequestCommandUseCase } from "src/contexts/contracts/request/adapter/usecase/command/create-request";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";

const usecaseMap = {
  GetRequestUseCase: () => {},
  ListRequestsUseCase: () => {},
};

const commandUseCaseMap = {
  createRequest: async (command: CreateRequestCommand) => {},
};
