import { AmountUnit } from "src/contexts/contracts/contract/domain/amount-unit";

export default interface TransferAmount {
  // 물량
  amount: number;

  // 물량 단위
  unit: AmountUnit;
}
