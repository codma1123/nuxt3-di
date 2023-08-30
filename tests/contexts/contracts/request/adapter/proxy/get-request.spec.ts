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
    proxy = new GetRequestProxy(client);

    requestMap.set(id, {
      id,
      contractID: uuid4(),
      companyInformation: {
        name: "비투컴퍼니",
        address: "",
        representerName: "",
        registrationNumber: "",
        registrationDocumentAttachmentID: uuid4(),
        phoneNumber: "",
        roles: ["건설사"],
      },
      companyID: null,
      contractInformation: {
        constructionName: "",
        clientCompanyID: uuid4(),
        constructionStartDate: today,
        constructionEndDate: tomorrow,
        transferStartDate: today,
        transferEndDate: tomorrow,
        expectedTotalTransferAmount: {
          amount: 30,
          unit: "입방미터(m3)",
        },
        items: new Set<UUID>([uuid4()]),
      },
      managerInformations: [
        {
          email: "jh.lee@b2groups.com",
          phoneNumber: "010-9922-0333",
          isAssigned: true,
          name: "이준하",
          roles: new Set<ManagerRole>(["감리"]),
        },
        {
          email: "sj.beak@b2groups.com",
          phoneNumber: "010-9922-0335",
          isAssigned: false,
          name: "백세종",
          roles: new Set<ManagerRole>(["감리"]),
        },
      ],
      approvalStatus: "심사 필요",
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
    expect(response.companyInformation.name).toBe("비투컴퍼니");
  });
});
