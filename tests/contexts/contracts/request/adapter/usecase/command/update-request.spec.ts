import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { beforeEach, describe, test, expect } from "vitest";
import IUpdateRequestCommandUseCase, { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { RemoveRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/remove-request";
import UpdateRequestCommandUseCase from "src/contexts/contracts/request/adapter/usecase/command/update-request";
import uuid4 from "src/core/uuid";
import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
import {
  CompanyRolesIsEmptyError,
  TransferAmmountCannotBeNegativeError,
  InvalidConstructionDateRangeError,
  InvalidTransferDateRangeError,
  ItemsIsEmptyError,
  InvalidEmailError,
  Invalidphone_numberError,
  ManagerRolesIsEmptyError,
  ManagerInformationsIsEmptyError,
  AssignedManagerCanOnlyOneError,
  RequestNotExistsError,
} from "src/contexts/contracts/request/error";

const requestMap = new Map<UUID, UpdateRequestCommand>();

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

class FakeRequestCommandRepository implements IRequestCommandRepository {
  createRequest(command: CreateRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeRequest(command: RemoveRequestCommand): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async updateRequest(command: UpdateRequestCommand): Promise<void> {
    const updateTarget = requestMap.get(command.id);
    if (updateTarget === undefined) throw new RequestNotExistsError();
    requestMap.set(command.id, command);
  }
}

describe("contracts - request - 서비스 요청 변경 서비스", () => {
  let repository: IRequestCommandRepository;
  let updateRequest: IUpdateRequestCommandUseCase;
  let id: UUID;

  beforeEach(() => {
    repository = new FakeRequestCommandRepository();
    updateRequest = new UpdateRequestCommandUseCase(repository);
    requestMap.clear();

    id = uuid4();

    requestMap.set(id, {
      id,
      contract_id: uuid4(),
      company_information: {
        name: "수정전",
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
  });

  test("수정 할 업체 정보의 업체 역할이 비어있을 수 없다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("수정 할 운반 물량의 값은 0이거나 음수일 수 없다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("수정 할 준공일이 착공일보다 빠르거나 같을 수 없다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("수정 할 운행 종료일은 운행 시작일보다 빠르거나 같을 수 없다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("수정 할 운반 품목 목록이 비어있을 수 없다.", async () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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
        await updateRequest.execute({
          id,
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
        await updateRequest.execute({
          id,
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
    ).rejects.toThrowError(Invalidphone_numberError);
  });

  test("수정 할 관리자 역할 목록이 비어있을 수 없다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("수정 할 서비스 신청의 담당자 계정 목록이 비어있을 수 없다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("수정 할 서비스 이용 신청서의 담당자 지정은 1명이여야 한다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("수정 할 서비스 이용 신청서의 담당자 지정은 1명이여야 한다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id,
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

  test("존재하지 않는 서비스를 수정할 수 없다.", () => {
    expect(
      async () =>
        await updateRequest.execute({
          id: uuid4(),
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
        })
    ).rejects.toThrowError(RequestNotExistsError);
  });

  test("서비스 요청을 수정한다.", async () => {
    expect(requestMap.get(id)?.company_information.name).toBe("수정전");

    await updateRequest.execute({
      id,
      contract_id: uuid4(),
      company_information: {
        name: "수정후",
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
          name: "이준하 수정후",
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

    expect(requestMap.get(id)?.company_information.name).toBe("수정후");
  });
});
