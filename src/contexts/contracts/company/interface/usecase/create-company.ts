import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import { Nullable } from "src/core/nullable";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface CreateCompanyCommand extends Command {
	name: string;
	address: string;
	representerName: string;
	registrationNumber: string;
	registrationDocumentAttachmentId: UUID;
	phoneNumber: Nullable<string>;
	roles: CompanyRole[];
}
export interface ICreateCompanyCommandUseCase extends ICommandUseCase<CreateCompanyCommand> {}
