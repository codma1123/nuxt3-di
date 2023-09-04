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
import { IRequestCommandRepository } from "src/contexts/contracts/request/interface/repository/command";
import { CreateRequestCommand, ICreateRequestCommandUseCase } from "src/contexts/contracts/request/interface/usecase/command/create-request";

const EMAIL_REGEX = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
const PHONE_REGEX = /^\d{2,3}-\d{3,4}-\d{4}$/;

export class CreateRequestCommandUseCase implements ICreateRequestCommandUseCase {
  private repository: IRequestCommandRepository;

  constructor(repository: IRequestCommandRepository) {
    this.repository = repository;
  }

  public async execute(command: CreateRequestCommand): Promise<void> {
    if (command.company_information.roles.length === 0) throw new CompanyRolesIsEmptyError();

    if (command.contract_information.expected_total_transfer_amount.amount <= 0) throw new TransferAmmountCannotBeNegativeError();
    if (command.contract_information.construction_end_date <= command.contract_information.construction_start_date) throw new InvalidConstructionDateRangeError();
    if (command.contract_information.transfer_end_date <= command.contract_information.transfer_start_date) throw new InvalidTransferDateRangeError();
    if (command.contract_information.items.size === 0) throw new ItemsIsEmptyError();

    if (!command.manager_informations.every((managerInformation) => managerInformation.email.match(EMAIL_REGEX))) throw new InvalidEmailError();
    if (!command.manager_informations.every((managerInformation) => managerInformation.phone_number.match(PHONE_REGEX))) throw new InvalidPhoneNumberError();

    if (!command.manager_informations.every((managerInformation) => managerInformation.roles.size > 0)) throw new ManagerRolesIsEmptyError();

    if (command.manager_informations.length === 0) throw new ManagerInformationsIsEmptyError();
    if (command.manager_informations.filter((managerInforation) => managerInforation.is_assigned).length !== 1) throw new AssignedManagerCanOnlyOneError();
    await this.repository.createRequest(command);
  }
}
