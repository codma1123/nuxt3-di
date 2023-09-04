import TransferAmount from "src/contexts/contracts/contract/domain/transfer-amount";

export default interface ContractSummary {
  client_company_id: UUID;
  construction_name: string;
  construction_start_date: Date;
  construction_end_date: Date;
  transfer_start_date: Date;
  transfer_end_date: Date;
  expected_total_transfer_amount: TransferAmount;
  items: Set<UUID>;
}
