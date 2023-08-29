import { Nullable } from "src/core/nullable";

export default interface CompanySummary {
	name: string;
	phoneNumber: Nullable<string>;
}
