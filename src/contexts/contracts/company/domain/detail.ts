import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import { Nullable } from "src/core/nullable";

export default interface CompanyDetail {
  name: string;
  address: string;
  representer_name: string;
  registration_number: string;
  phone_number: Nullable<string>;
  roles: CompanyRole[];
}
