import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";

export default interface CompanyInformation {
  // 업체명
  name: string;

  // 주소
  address: string;

  // 대표자명
  representer_name: string;

  // 사업자등록번호
  registration_number: string;

  // 사업자등록증 첨부파일 ID
  registration_document_attachment_id: UUID;

  // 업체 전화번호
  phone_number: string;

  // 업체 역할 목록
  roles: CompanyRole[];
}
