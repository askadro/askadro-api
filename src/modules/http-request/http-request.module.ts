import { HttpModule, HttpService } from '@nestjs/axios';
import { Logger, Module, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
})
export class HttpRequestModule implements OnModuleInit {
  private readonly logger = new Logger(HttpRequestModule.name);

  constructor(private readonly httpService: HttpService) {
    this.axios = this.httpService.axiosRef;
  }

  axios: any;

  onModuleInit(): any {
    this.axios.interceptors.request.use(
        (config: { url: any; method: any; data: any; }) => {
        this.logger.log({
          name: `Request... ${config.url}`,
          method: config.method,
          url: config.url,
          data: config.data ? config.data : '',
        });
        return config;
      },
        (error: any) => {
        this.logger.error(`Request error: ${error}`);
        return Promise.reject(error);
      },
    );

    this.axios.interceptors.response.use(
        (response: { data: any; }) => {
        this.logger.log({
          name: 'Response...',
          response: response.data,
        });
        return response;
      },
      async (error: any) => {
        this.logger.error(`Response error: ${error}`);
        return Promise.reject(error);
      },
    );
  }
}
