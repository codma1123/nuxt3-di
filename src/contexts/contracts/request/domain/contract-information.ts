import TransferAmount from "src/contexts/contracts/request/domain/transfer-amount";

export default interface ContractInformation {
  //공사명
  construction_name: string;

  //발주처 업체 ID
  client_company_id: UUID;

  //착공일
  construction_start_date: Date;

  //준공일
  construction_end_date: Date;

  //운반 시작일
  transfer_start_date: Date;

  //운반 종료일
  transfer_end_date: Date;

  //총 예상 물량
  expected_total_transfer_amount: TransferAmount;

  //운반 품목 목록
  items: Set<UUID>;
}
