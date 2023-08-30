import { Axios, AxiosResponse } from "axios";
import client from "src/contexts/contracts/company/adapter/client";
import ListRequestsProxy from "src/contexts/contracts/request/adapter/proxy/list-requests";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import uuid4 from "src/core/uuid";
import { describe, vitest, expect, test, beforeEach } from "vitest";

const id1 = uuid4();
const id2 = uuid4();

const requestMap = new Map<UUID, RequestSummary>();

describe("contracts - request - 서비스 단일 조회 프록시", () => {
  let proxy: ListRequestsProxy;

  beforeEach(() => {
    vitest.resetAllMocks();
    requestMap.clear();
    proxy = new ListRequestsProxy(client);

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

    vitest.spyOn(Axios.prototype, "get").mockImplementation(async (_, body): Promise<AxiosResponse<RequestSummary[]>> => {
      return {
        data: Array.from(requestMap.values()),
      } as AxiosResponse;
    });
  });

  test("서비스 요청 목록을 조회한다. ", async () => {
    const response = await proxy.execute({
      offset: 0,
      limit: 2,
      search: null,
      order: null,
      desc: false,
    });

    expect(response.length).toBe(2);
  });
});
