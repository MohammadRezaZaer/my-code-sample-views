import {
  OrdersQueryOptionsType,
  PaginatorInfo,
  QueryParamsType,
  Log,
} from '@framework/types';
import { RequestParams } from '@framework/utils/base-service';
import { mapPaginatorData } from '@framework/utils/data-mappers';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
} from 'react-query';
import { logService } from './logs.service';
import {AUTH_TOKEN} from "@lib/constants";
import Cookies from "js-cookie";
import {getToken} from "@framework/utils/get-token";

type LogPaginator = {
  logs: Log[];
};
export async function fetchLogs({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<LogPaginator> {

  const fetchedData = await logService.findAllWithToken();

  //console.log(fetchedData);
  const { data} = fetchedData;
  //console.log("data?.logs",data?.logs);

  return { logs:data?.logs };
}

export const useLogsQuery = (
  params?: OrdersQueryOptionsType,

) => {
  return useInfiniteQuery<LogPaginator, Error>(
    [API_ENDPOINTS.LOGS, params],
    fetchLogs,

  );
};

type LogCreateInputType = {
  order_id: string;
  title: string;
  description: string;
  images?: string[];
};

export const useCreateLogMutation = () => {
  return useMutation((input: LogCreateInputType) =>
    logService.create(input)
  );
};
