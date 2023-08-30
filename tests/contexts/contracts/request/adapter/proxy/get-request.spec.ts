import { Axios, AxiosResponse } from "axios";
import client from "src/contexts/contracts/company/adapter/client";
import GetRequestProxy from "src/contexts/contracts/request/adapter/proxy/get-request";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
import { RequestNotExistsError } from "src/contexts/contracts/request/error";
import uuid4 from "src/core/uuid";
import { describe, beforeEach, test, vitest, expect } from "vitest";

const id = uuid4();

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const requestMap = new Map<UUID, RequestDetail>();

describe("contracts - request - 서비스 단일 조회 프록시", () => {
  let proxy: GetRequestProxy;

  beforeEach(() => {
    vitest.resetAllMocks();
    requestMap.clear();
    proxy = new GetRequestProxy(client);

    requestMap.set(id, {
      id,
      contract_id: uuid4(),
      company_information: {
        name: "비투컴퍼니",
        address: "",
        representer_name: "",
        registration_number: "",
        registration_document_attachment_id: uuid4(),
        phone_number: "",
        roles: ["건설사"],
      },
      company_id: null,
      contract_information: {
        construction_name: "",
        client_company_id: uuid4(),
        construction_start_date: today,
        construction_end_date: tomorrow,
        transfer_start_date: today,
        transfer_end_date: tomorrow,
        expected_total_transfer_amount: {
          amount: 30,
          unit: "입방미터(m3)",
        },
        items: new Set<UUID>([uuid4()]),
      },
      manager_informations: [
        {
          email: "jh.lee@b2groups.com",
          phone_number: "010-9922-0333",
          is_assigned: true,
          name: "이준하",
          roles: new Set<ManagerRole>(["감리"]),
        },
        {
          email: "sj.beak@b2groups.com",
          phone_number: "010-9922-0335",
          is_assigned: false,
          name: "백세종",
          roles: new Set<ManagerRole>(["감리"]),
        },
      ],
      approval_status: "심사 필요",
      timestamp: new Date(),
    });

    vitest.spyOn(Axios.prototype, "get").mockImplementation(async (url): Promise<AxiosResponse<RequestDetail, any>> => {
      const id = url.split("/")[2] as UUID;
      const target = requestMap.get(id);
      if (target === undefined) throw new RequestNotExistsError();
      return { data: target } as AxiosResponse;
    });
  });

  test("서비스 요청을 단일 조회한다.", async () => {
    const response = await proxy.execute({ id });
    expect(response.id).toBe(id);
    expect(response.company_information.name).toBe("비투컴퍼니");
  });
});
