import { BaseService } from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { useQuery } from 'react-query';
import {Server} from '@framework/types';
import {useIsServerAvailableQuery} from "@framework/app/is-server-available.query";
import {useSettings} from "@components/settings/settings.context";
import {useRouter} from "next/router";
import {ROUTES} from "@lib/routes";

class ServersService extends BaseService {}
const serversService = new ServersService(API_ENDPOINTS.SERVERS);

class UserIPService extends BaseService {}
const userIPService = new UserIPService(API_ENDPOINTS.USER_IP);

export const fetchServers = async () => {
  //  const setServer = queryKey[1] ;

    const { data:serversRawData } = await serversService.findAllWithAuth();
  const {data:userdata } = await userIPService.findAllWithAuth();

    const  serversSorted = await sortServers(userdata,serversRawData.servers);

    //console.log(serversSorted);
  for (const server of serversSorted) {
      const { data:serverStatus } = await serversService.findAllWithAuthAndUrl(`${server.url}:${server.port}/status`);
      if(serverStatus.status==="Available"){
        server.isAvailableStatus=true;
         // setServer(server);
        break;
      }
   // console.log("after",data);
  }


  console.log("fetch");

  return {servers:serversSorted , userIp:userdata};
};
type ServersResponse = {
  servers: [Server],
  user:{},
  error:any
};
export const useServersQuery = () => {
    const router = useRouter();
    const {isInProgress} = useSettings();
    const { pathname } = router;
    //console.log("pathname",pathname);
  return useQuery<ServersResponse, Error>(
    API_ENDPOINTS.SERVERS,
    fetchServers,
      { enabled: (pathname===ROUTES.HOME && !isInProgress) }
  );
};

const sortServers = (userdata, serversArr) => {

        // console.log("userdata,serversArr", userdata, serversArr.servers);

    return new Promise((resolve, reject) => {
    //
                const distances = {};

                for (let i = 0; i < serversArr.length; i++) {
                    const diff = getDistanceInKm(
                        serversArr[i].lat,
                        serversArr[i].lng,
                        userdata.latitude,
                        userdata.longitude
                    );
                    distances[diff] = serversArr[i].id;
                }

                const sortedDistancesKey = Object.keys(distances).sort((a, b) => a - b);
                //console.log(sortedDistancesKey);

                const serversSorted = [];
                sortedDistancesKey.forEach((key) => {
                    const srv = serversArr.filter((srv) => {
                        return srv.id === distances[key];
                    });

                    serversSorted.push(srv[0]);
                });
                //console.log("serversSorted",serversSorted);
                // resolve({ serversSorted });
                resolve(serversSorted );
    });
};

const getDistanceInKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = degToRad(lat2 - lat1);
    const dLng = degToRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};
const degToRad = (deg) => {
    return deg * (Math.PI / 180);
};
const checkServersAvailability = (data) => {

    const { data:serverAvailData, isLoading: loading, error } = useIsServerAvailableQuery(data[0]);
  console.log(serverAvailData);
    // if (res.data.status === "Available") {
    //   resolve(true);
    // } else {
    //   console.log("server not available.. switching...");
    //   resolve(false);
    // }

  };