import { GetRequestQueryUseCase } from "src/contexts/contracts/request/adapter/usecase/query/get-request";
import RequestDetail from "src/contexts/contracts/request/domain/detail";
import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
import RequestSummary from "src/contexts/contracts/request/domain/summary";
import { RequestNotExistsError } from "src/contexts/contracts/request/error";
import IGetRequestProxy from "src/contexts/contracts/request/interface/proxy/get-request";
import { IRequestQueryRepository } from "src/contexts/contracts/request/interface/repository/query";
import { GetRequestQuery, IGetRequestQueryUseCase } from "src/contexts/contracts/request/interface/usecase/query/get-request";
import uuid4 from "src/core/uuid";
import { beforeEach, describe, test, expect } from "vitest";

const id = uuid4();

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const requestMap = new Map<UUID, RequestDetail>();

class FakeRequestProxy implements IGetRequestProxy {
  public async execute(query: GetRequestQuery): Promise<RequestDetail> {
    const target = requestMap.get(query.id);
    if (target === undefined) throw new RequestNotExistsError();
    return target;
  }
}

const requestStoreState: {
  summary: RequestSummary[] | null;
  detail: RequestDetail | null;
} = {
  summary: null,
  detail: null,
};

class FakeRequestQueryRepository implements IRequestQueryRepository {
  setSummary(summary: RequestSummary[]): void {}
  setDetail(detail: RequestDetail): void {
    requestStoreState.detail = detail;
  }
}

describe("contracts - request - 서비스 요청 단일 조회 서비스", () => {
  let proxy: IGetRequestProxy;
  let repository: IRequestQueryRepository;
  let getRequest: IGetRequestQueryUseCase;

  beforeEach(() => {
    requestMap.clear();
    requestStoreState.summary = null;
    requestStoreState.detail = null;

    requestMap.set(id, {
      id,
      contractID: uuid4(),
      companyInformation: {
        name: "",
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

    proxy = new FakeRequestProxy();
    repository = new FakeRequestQueryRepository();
    getRequest = new GetRequestQueryUseCase(repository, proxy);
  });

  test("존재하지 않는 서비스를 조회할 수 없다", () => {
    expect(async () => await getRequest.execute({ id: uuid4() })).rejects.toThrowError(RequestNotExistsError);
  });

  test("서비스 요청을 조회한다.", async () => {
    expect(requestStoreState.detail).toBeFalsy();
    await getRequest.execute({ id });
    expect(requestStoreState.detail?.id).toBe(id);
    expect(requestStoreState.detail?.managerInformations[0].name).toBe("이준하");
  });
});
