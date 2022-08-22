import { BaseService } from '@framework/utils/base-service';
import { API_ENDPOINTS } from '@framework/utils/endpoints';

class LogService extends BaseService {}
export const logService = new LogService(API_ENDPOINTS.LOGS);
