import RequestDetail from "src/contexts/contracts/request/domain/detail";
import { Nullable } from "src/core/nullable";
import IPresenter from "src/core/presenter";

export default interface IRequestDetailPresenter extends IPresenter<Nullable<RequestDetail>> {}
