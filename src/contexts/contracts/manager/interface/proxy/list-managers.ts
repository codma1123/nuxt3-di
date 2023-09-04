import ManagerSummary from "src/contexts/contracts/manager/domain/summary";
import { ListManagersQuery } from "src/contexts/contracts/manager/interface/usecase/query/list-managers";
import { IProxy } from "src/core/proxy";

export default interface IListManagersProxy extends IProxy<ListManagersQuery, ManagerSummary[]> {}
