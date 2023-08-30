import { Axios, AxiosResponse } from "axios";
import client from "src/contexts/contracts/company/adapter/client";
import { RequestCommandRepository } from "src/contexts/contracts/request/adapter/repository/command";
import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";
import uuid4 from "src/core/uuid";
import { beforeEach, describe, vitest, test, expect } from "vitest";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

describe("contracts - request - 커멘드 레파지토리", () => {
  let repository: RequestCommandRepository;

  beforeEach(() => {
    vitest.resetAllMocks();
    repository = new RequestCommandRepository(client);

    vitest.spyOn(Axios.prototype, "post").mockImplementation(async (url, body) => ({
      data: null,
      status: 200,
    }));
    vitest.spyOn(Axios.prototype, "delete").mockImplementation(async () => ({
      data: null,
      status: 200,
    }));
    vitest.spyOn(Axios.prototype, "put").mockImplementation(async () => ({
      data: null,
      status: 200,
    }));
  });

  test("서비스 이용 생성", async () => {
    await repository.createRequest({
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
  });

  test("서비스 이용 삭제", async () => {
    await repository.removeRequest({
      id: uuid4(),
    });
  });

  test("서비스 이용 업데이트", async () => {
    await repository.updateRequest({
      id: uuid4(),
      company_id: null,
      contract_id: null,
      company_information: {
        name: "",
        address: "",
        representer_name: "",
        registration_number: "",
        registration_document_attachment_id: uuid4(),
        phone_number: "",
        roles: ["건설사"],
      },
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
});
