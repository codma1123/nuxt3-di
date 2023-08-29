import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import { Nullable } from "src/core/nullable";

export default interface CompanyDetail {
	name: string;
	address: string;
	representerName: string;
	registrationNumber: string;
	phoneNumber: Nullable<string>;
	roles: CompanyRole[];
}
