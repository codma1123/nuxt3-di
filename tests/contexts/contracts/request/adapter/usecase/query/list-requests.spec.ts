import { ListRequestsQueryUseCase } from "src/contexts/contracts/request/adapter/usecase/query/list-requests";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import IListRequestsProxy from "src/contexts/contracts/request/interface/proxy/list-requests";
import { IRequestQueryRepository } from "src/contexts/contracts/request/interface/repository/query";
import { ListRequestsQuery } from "src/contexts/contracts/request/interface/usecase/query/list-requests";
import uuid4 from "src/core/uuid";
import { describe, beforeEach, test, expect } from "vitest";

const id1 = uuid4();
const id2 = uuid4();

const requestMap = new Map<UUID, RequestSummary>();

class FakeRequestProxy implements IListRequestsProxy {
  public async execute(query: ListRequestsQuery): Promise<RequestSummary[]> {
    return Array.from(requestMap.values());
  }
}

const requestStoreState: {
  summary: RequestSummary[];
  detail: RequestDetail | null;
} = {
  summary: [],
  detail: null,
};

class FakeRequestQueryRepository implements IRequestQueryRepository {
  setSummary(summary: RequestSummary[]): void {
    requestStoreState.summary = summary;
  }
  setDetail(detail: RequestDetail): void {
    throw new Error("Method not implemented.");
  }
}

describe("contracts - request - 서비스 요청 목록 조회 서비스", () => {
  let repository: IRequestQueryRepository;
  let proxy: IListRequestsProxy;
  let listRequests: ListRequestsQueryUseCase;

  beforeEach(() => {
    requestMap.clear();
    requestStoreState.summary.length = 0;
    requestStoreState.detail = null;

    repository = new FakeRequestQueryRepository();
    proxy = new FakeRequestProxy();
    listRequests = new ListRequestsQueryUseCase(repository, proxy);

    requestMap.set(id1, {
      timestamp: new Date(),
      construction_name: "비투텍 공사",
      company_name: "비투텍",
      manager_email: "jh.lee@b2groups.com",
      manager_phone_number: "010-9922-0335",
      approval_status: "심사 필요",
    });

    requestMap.set(id2, {
      timestamp: new Date(),
      construction_name: "아이앤유니 공사",
      company_name: "아이앤유니",
      manager_email: "sj.beak@b2groups.com",
      manager_phone_number: "010-9922-0333",
      approval_status: "심사 필요",
    });
  });

  test("서비스 요청 목록을 조회한다.", async () => {
    expect(requestStoreState.summary.length).toBe(0);
    await listRequests.execute({
      desc: false,
      offset: 0,
      limit: null,
      search: null,
      order: null,
    });
    expect(requestStoreState.summary.length).toBe(2);
  });
});
