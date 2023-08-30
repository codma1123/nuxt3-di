import { ManagerRole } from "src/contexts/contracts/request/interface/domain/manager-role";

export default interface ManagerInformation {
  // 관리자 이름
  name: string;

  // 이메일 주소
  email: string;

  // 전화번호
  phone_number: string;

  // 담당자 지정 여부
  is_assigned: boolean;

  // 관리자 역할 목록
  roles: Set<ManagerRole>;
}
