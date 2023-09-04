import RejectRequestCommandUseCase from "src/contexts/contracts/request/adapter/usecase/command/reject-request";
import { RequestNotExistsError } from "src/contexts/contracts/request/error";
import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { ApproveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/approve-request";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import IRejectRequestCommandUseCase, { RejectRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/reject-request";
import { RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/remove-request";
import { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";
import uuid4 from "src/core/uuid";
import { beforeEach, describe, expect, test } from "vitest";

const requestMap = new Map<UUID, {}>();

class FakeRequestCommandRepository implements IRequestCommandRepository {
  approveRequest(command: ApproveRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async rejectRequest(command: RejectRequestCommand): Promise<void> {
    const removeTarget = requestMap.get(command.id);
    if (removeTarget === undefined) throw new RequestNotExistsError();
    requestMap.delete(command.id);
  }
  createRequest(command: CreateRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async removeRequest(command: RemoveRequestCommand): Promise<void> {}
  updateRequest(command: UpdateRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("contracts - request - 서비스이용 신청 반려 서비스", () => {
  let repository: IRequestCommandRepository;
  let rejectRequest: IRejectRequestCommandUseCase;

  beforeEach(() => {
    requestMap.clear();
    repository = new FakeRequestCommandRepository();
    rejectRequest = new RejectRequestCommandUseCase(repository);
  });

  test("존재하지 않는 서비스를 반려 할 수 없다.", () => {
    expect(async () => await rejectRequest.execute({ id: uuid4() })).rejects.toThrowError(RequestNotExistsError);
  });

  test("서비스 요청을 반려한다.", async () => {
    const id = uuid4();
    requestMap.set(id, {});

    expect(requestMap.size).toBe(1);
    await rejectRequest.execute({ id });
    expect(requestMap.size).toBe(0);
  });
});
