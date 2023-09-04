import { ManagerRole } from "src/contexts/contracts/request/domain/manager-role";

export default interface ManagerSummary {
  name: string;
  phone_number: string;
  roles: Set<ManagerRole>;
}
