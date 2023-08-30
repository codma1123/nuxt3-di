import DomainError from "src/core/error";

export class RequestAlreadyProcessedError extends DomainError {
  constructor() {
    super(14000, "이미 처리된 신청입니다.");
  }
}

export class InvalidConstructionDateRangeError extends DomainError {
  constructor() {
    super(14001, "공사 기간을 산정할 수 없습니다. 준공일은 착공일보다 빠르거나 같을 수 없습니다.");
  }
}

export class InvalidTransferDateRangeError extends DomainError {
  constructor() {
    super(14002, "서비스 이용 기간을 산정할 수 없습니다. 운행 종료일은 운행 시작일보다 빠르거나 같을 수 없습니다.");
  }
}

export class ItemsIsEmptyError extends DomainError {
  constructor() {
    super(14003, "운반 품목 목록이 비어있습니다.");
  }
}

export class CompanyRolesIsEmptyError extends DomainError {
  constructor() {
    super(14004, "업체 역할 목록이 비어있습니다.");
  }
}

export class InvalidEmailError extends DomainError {
  constructor() {
    super(14005, "유효하지 않은 이메일 주소입니다.");
  }
}

export class InvalidPhoneNumberError extends DomainError {
  constructor() {
    super(14006, "유효하지 않은 전화번호입니다.");
  }
}

export class ManagerRolesIsEmptyError extends DomainError {
  constructor() {
    super(14007, "관리자 역할 목록이 비어있습니다.");
  }
}

export class TransferAmmountCannotBeNegativeError extends DomainError {
  constructor() {
    super(14008, "운반 물량의 값은 0이거나 음수일 수 없습니다.");
  }
}

export class AssignedManagerCanOnlyOneError extends DomainError {
  constructor() {
    super(14009, "서비스 이용 신청서의 담당자 지정은 1명만 가능합니다.");
  }
}

export class ManagerInformationsIsEmptyError extends DomainError {
  constructor() {
    super(14010, "서비스 이용 신청서의 담당자 계정 정보 목록이 비어있습니다.");
  }
}

export class ConstructionNameAlreadyExistsError extends DomainError {
  constructor() {
    super(13000, "이미 등록된 계약 공사명입니다.");
  }
}

export class CompanyRegistrationNumberAlreadyExistsError extends DomainError {
  constructor() {
    super(13001, "이미 등록된 사업자 등록번호입니다.");
  }
}

export class RequestNotExistsError extends DomainError {
  constructor() {
    super(13002, "존재하지 않는 서비스 이용 신청 정보입니다.");
  }
}
