import { CompanyRole } from "src/contexts/contracts/company/domain/company-role";

export default interface CompanyInformation {
  // 업체명
  name: string;

  // 주소
  address: string;

  // 대표자명
  representerName: string;

  // 사업자등록번호
  registrationNumber: string;

  // 사업자등록증 첨부파일 ID
  registrationDocumentAttachmentID: UUID;

  // 업체 전화번호
  phoneNumber: string;

  // 업체 역할 목록
  roles: CompanyRole[];
}
