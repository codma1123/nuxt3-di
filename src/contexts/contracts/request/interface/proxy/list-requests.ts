import RequestSummary from "src/contexts/contracts/request/domain/summary";
import { ListRequestsQuery } from "src/contexts/contracts/request/interface/usecase/query/list-requests";
import { IProxy } from "src/core/proxy";

export default interface IListRequestsProxy extends IProxy<ListRequestsQuery, RequestSummary[]> {}
