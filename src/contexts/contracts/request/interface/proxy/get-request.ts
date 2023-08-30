import RequestDetail from "src/contexts/contracts/request/domain/detail";
import { GetRequestQuery } from "src/contexts/contracts/request/interface/usecase/query/get-request";
import { IProxy } from "src/core/proxy";

export default interface IGetRequestProxy extends IProxy<GetRequestQuery, RequestDetail> {}
