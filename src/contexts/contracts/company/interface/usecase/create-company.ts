import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";
import { Nullable } from "src/core/nullable";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface CreateCompanyCommand extends Command {
  name: string;
  address: string;
  representer_name: string;
  registration_number: string;
  registration_document_attachment_id: UUID;
  phone_number: Nullable<string>;
  roles: CompanyRole[];
}
export interface ICreateCompanyCommandUseCase extends ICommandUseCase<CreateCompanyCommand> {}
