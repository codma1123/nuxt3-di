import { IQueryUseCase } from "src/core/usecase";

export interface ValidateContractionNameQuery {
  construction_name: string;
}

export default interface IValidateContractonNameQueryUseCase extends IQueryUseCase<ValidateContractionNameQuery> {}
