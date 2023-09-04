import { Nullable } from "src/core/nullable";
import { Command, ICommandUseCase } from "src/core/usecase";

export interface UpdateCompanyCommand extends Command {
  // 업체 ID
  id: UUID;

  // 업체명
  name: string;

  // 주소
  address: string;

  // 대표자명
  representer_name: string;

  // 사업자등록번호
  registration_number: string;

  // 사업자등록증 첨부파일
  registration_document_attachment_id: any;

  // 업체 전화번호
  phone_number: Nullable<string>;
}

export default interface IUpdateCompanyCommandUseCase extends ICommandUseCase<UpdateCompanyCommand> {}
