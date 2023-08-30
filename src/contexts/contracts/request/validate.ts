import {
  CompanyRolesIsEmptyError,
  TransferAmmountCannotBeNegativeError,
  InvalidConstructionDateRangeError,
  InvalidTransferDateRangeError,
  ItemsIsEmptyError,
  InvalidEmailError,
  InvalidPhoneNumberError,
  ManagerRolesIsEmptyError,
  ManagerInformationsIsEmptyError,
  AssignedManagerCanOnlyOneError,
} from "src/contexts/contracts/request/error";
import { CreateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/create-request";
import { UpdateRequestCommand } from "src/contexts/contracts/request/interface/usecase/command/update-request";

const EMAIL_REGEX = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
const PHONE_REGEX = /^\d{2,3}-\d{3,4}-\d{4}$/;

export const commandValidateor = (command: UpdateRequestCommand | CreateRequestCommand) => {
  if (command.companyInformation.roles.length === 0) throw new CompanyRolesIsEmptyError();

  if (command.contractInformation.expectedTotalTransferAmount.amount <= 0) throw new TransferAmmountCannotBeNegativeError();
  if (command.contractInformation.constructionEndDate <= command.contractInformation.constructionStartDate) throw new InvalidConstructionDateRangeError();
  if (command.contractInformation.transferEndDate <= command.contractInformation.transferStartDate) throw new InvalidTransferDateRangeError();
  if (command.contractInformation.items.size === 0) throw new ItemsIsEmptyError();

  if (!command.managerInformations.every((managerInformation) => managerInformation.email.match(EMAIL_REGEX))) throw new InvalidEmailError();
  if (!command.managerInformations.every((managerInformation) => managerInformation.phoneNumber.match(PHONE_REGEX))) throw new InvalidPhoneNumberError();

  if (!command.managerInformations.every((managerInformation) => managerInformation.roles.size > 0)) throw new ManagerRolesIsEmptyError();

  if (command.managerInformations.length === 0) throw new ManagerInformationsIsEmptyError();
  if (command.managerInformations.filter((managerInforation) => managerInforation.isAssigned).length !== 1) throw new AssignedManagerCanOnlyOneError();
  return;
};
