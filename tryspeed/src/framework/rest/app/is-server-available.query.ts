import {BaseService, RequestParams} from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { useQuery } from 'react-query';
import {useSettings} from "@components/settings/settings.context";
import {QueryParamsType, Server, ServerQueryType} from "@framework/types";

class IsServerAvailableService extends BaseService {}
const serversService = new IsServerAvailableService("/");



export const fetchIsServerAvailable = async ({queryKey}) => {
  const server = queryKey[1] as Server;
  //const {selectedServer} = useSettings();
  const { data } = await serversService.findAllWithAuthAndUrl(`${server.url}:${server.port}/status`);
   //console.log("fetch",data);
  return {data};
};
type IsServerAvailableResponse = {
   //servers: [Server],
  // user:{},
  // error:any
};
export const useIsServerAvailableQuery = (server:Server) => {
  return useQuery<IsServerAvailableResponse, Error>(
    [API_ENDPOINTS.IS_SERVER_AVAILABLE,server],
      fetchIsServerAvailable,
  );
};
