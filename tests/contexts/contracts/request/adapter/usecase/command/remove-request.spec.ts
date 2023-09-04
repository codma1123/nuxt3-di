import RemoveRequestCommandUseCase from "src/contexts/contracts/request/adapter/usecase/command/remove-request";
import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/remove-request";
import { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";
import { beforeEach, describe, test, expect } from "vitest";
import uuid4 from "src/core/uuid";
import { RequestNotExistsError } from "src/contexts/contracts/request/error";
import { ApproveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/approve-request";
import { RejectRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/reject-request";

const requestMap = new Map<UUID, {}>();

class FakeRequestCommandRepository implements IRequestCommandRepository {
  approveRequest(command: ApproveRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  rejectRequest(command: RejectRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createRequest(command: CreateRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async removeRequest(command: RemoveRequestCommand): Promise<void> {
    const removeTarget = requestMap.get(command.id);
    if (removeTarget === undefined) throw new RequestNotExistsError();
    requestMap.delete(command.id);
  }
  updateRequest(command: UpdateRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("contracts - request - 서비스 요청 삭제 서비스", () => {
  let repository: IRequestCommandRepository;
  let removeRequest: RemoveRequestCommandUseCase;

  beforeEach(() => {
    requestMap.clear();
    repository = new FakeRequestCommandRepository();
    removeRequest = new RemoveRequestCommandUseCase(repository);
  });

  test("존재하지 않는 서비스를 삭제할 수 없다.", () => {
    expect(async () => await removeRequest.execute({ id: uuid4() })).rejects.toThrowError(RequestNotExistsError);
  });

  test("서비스 요청을 삭제한다.", async () => {
    const id = uuid4();
    requestMap.set(id, {});

    expect(requestMap.size).toBe(1);
    await removeRequest.execute({ id });
    expect(requestMap.size).toBe(0);
  });
});
