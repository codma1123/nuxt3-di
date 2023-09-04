import { Nullable } from "src/core/nullable";

export default interface CompanySummary {
  id: UUID;
  name: string;
  phone_number: Nullable<string>;
}
