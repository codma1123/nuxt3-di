import { CreateRequestCommandUseCase } from "src/contexts/contracts/request/adapter/usecase/command/create-request";
import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/remove-request";
import { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";
import { beforeEach, describe, test, expect } from "vitest";
import uuid4 from "src/core/uuid";
import {
  AssignedManagerCanOnlyOneError,
  CompanyRolesIsEmptyError,
  InvalidConstructionDateRangeError,
  InvalidEmailError,
  InvalidPhoneNumberError,
  InvalidTransferDateRangeError,
  ItemsIsEmptyError,
  ManagerInformationsIsEmptyError,
  ManagerRolesIsEmptyError,
  TransferAmmountCannotBeNegativeError,
} from "src/contexts/contracts/request/error";
import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
import { ApproveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/approve-request";
import { RejectRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/reject-request";

const requestMap = new Map<UUID, CreateRequestCommand>();

class FakeRequestCommandRepository implements IRequestCommandRepository {
  approveRequest(command: ApproveRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  rejectRequest(command: RejectRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async createRequest(command: CreateRequestCommand): Promise<void> {
    requestMap.set(uuid4(), command);
  }
  removeRequest(command: RemoveRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateRequest(command: UpdateRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

describe("contracts - request - 서비스 요청 생성 서비스", () => {
  let repository: IRequestCommandRepository;
  let createRequest: CreateRequestCommandUseCase;

  beforeEach(() => {
    requestMap.clear();
    repository = new FakeRequestCommandRepository();
    createRequest = new CreateRequestCommandUseCase(repository);
  });

  test("업체 정보의 업체 역할이 비어있을 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
            address: "",
            representer_name: "",
            registration_number: "",
            registration_document_attachment_id: uuid4(),
            phone_number: "",
            roles: [],
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
              amount: 20,
              unit: "입방미터(m3)",
            },
            items: new Set<UUID>([uuid4()]),
          },
          manager_informations: [
            {
              email: "jh.lee@b2groups.com",
              phone_number: "010-9922-0335",
              is_assigned: true,
              name: "이준하",
              roles: new Set<ManagerRole>(["감리"]),
            },
          ],
        })
    ).rejects.toThrowError(CompanyRolesIsEmptyError);
  });

  test("운반 물량의 값은 0이거나 음수일 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
            address: "",
            representer_name: "",
            registration_number: "",
            roles: ["건설사"],
            registration_document_attachment_id: uuid4(),
            phone_number: "",
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
              amount: -5,
              unit: "입방미터(m3)",
            },
            items: new Set<UUID>([uuid4()]),
          },
          manager_informations: [
            {
              email: "jh.lee@b2groups.com",
              phone_number: "010-9922-0335",
              is_assigned: true,
              name: "이준하",
              roles: new Set<ManagerRole>(["감리"]),
            },
          ],
        })
    ).rejects.toThrowError(TransferAmmountCannotBeNegativeError);
  });

  test("준공일이 착공일보다 빠르거나 같을 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
            construction_start_date: tomorrow,
            construction_end_date: today,
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
              phone_number: "010-9922-0335",
              is_assigned: true,
              name: "이준하",
              roles: new Set<ManagerRole>(["감리"]),
            },
          ],
        })
    ).rejects.toThrowError(InvalidConstructionDateRangeError);
  });

  test("운행 종료일은 운행 시작일보다 빠르거나 같을 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
            transfer_start_date: tomorrow,
            transfer_end_date: today,
            expected_total_transfer_amount: {
              amount: 30,
              unit: "입방미터(m3)",
            },
            items: new Set<UUID>([uuid4()]),
          },
          manager_informations: [
            {
              email: "jh.lee@b2groups.com",
              phone_number: "010-9922-0335",
              is_assigned: true,
              name: "이준하",
              roles: new Set<ManagerRole>(["감리"]),
            },
          ],
        })
    ).rejects.toThrowError(InvalidTransferDateRangeError);
  });

  test("운반 품목 목록이 비어있을 수 없다.", async () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
            items: new Set(),
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
        })
    ).rejects.toThrowError(ItemsIsEmptyError);
  });

  test("유효하지 않은 관리자 이메일 주소를 사용할 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
              email: "jh.lee@b2groups",
              phone_number: "010-9922-0335",
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
        })
    ).rejects.toThrowError(InvalidEmailError);
  });

  test("유효하지 않은 관리자 전화 번호를 사용할 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
              phone_number: "010-9922-033",
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
        })
    ).rejects.toThrowError(InvalidPhoneNumberError);
  });

  test("관리자 역할 목록이 비어있을 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
              roles: new Set(),
            },
            {
              email: "sj.beak@b2groups.com",
              phone_number: "010-9922-0335",
              is_assigned: false,
              name: "백세종",
              roles: new Set<ManagerRole>(["감리"]),
            },
          ],
        })
    ).rejects.toThrowError(ManagerRolesIsEmptyError);
  });

  test("서비스 신청의 담당자 계정 목록이 비어있을 수 없다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
          manager_informations: [],
        })
    ).rejects.toThrowError(ManagerInformationsIsEmptyError);
  });

  test("서비스 이용 신청서의 담당자 지정은 1명이여야 한다.", () => {
    expect(
      async () =>
        await createRequest.execute({
          contract_id: uuid4(),
          company_information: {
            name: "",
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
              is_assigned: true,
              name: "백세종",
              roles: new Set<ManagerRole>(["감리"]),
            },
          ],
        })
    ).rejects.toThrowError(AssignedManagerCanOnlyOneError);
  });

  test("서비스 요청을 생성한다.", async () => {
    expect(requestMap.size).toBe(0);

    await createRequest.execute({
      contract_id: uuid4(),
      company_information: {
        name: "",
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
    });

    expect(requestMap.size).toBe(1);
  });
});
