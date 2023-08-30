import TransferAmount from "src/contexts/contracts/request/domain/transfer-amount";

export default interface ContractInformation {
  //공사명
  constructionName: string;

  //발주처 업체 ID
  clientCompanyID: UUID;

  //착공일
  constructionStartDate: Date;

  //준공일
  constructionEndDate: Date;

  //운반 시작일
  transferStartDate: Date;

  //운반 종료일
  transferEndDate: Date;

  //총 예상 물량
  expectedTotalTransferAmount: TransferAmount;

  //운반 품목 목록
  items: Set<UUID>;
}
