import { Nullable } from "src/core/nullable";

export default interface CompanySummary {
  name: string;
  phone_number: Nullable<string>;
}
