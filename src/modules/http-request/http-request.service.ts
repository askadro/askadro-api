import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpRequestService {
  constructor(
    private httpService: HttpService,
    private logger: Logger,
  ) {}

  private appendTokenToUrl(url: string, token?: string): string {
    return token ? `${url}/${token}` : url;
  }

  async get(url: string, params?: object, token?: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    const requestUrl = this.appendTokenToUrl(url, token);
    const axiosConfig: AxiosRequestConfig = {
      params,
      ...config,
    };
    try {
      return await this.httpService.axiosRef.get(requestUrl, axiosConfig);
    } catch (error) {
      this.logger.verbose(error);
      throw new BadRequestException();
    }
  }

  async post(url: string, token?: string, body?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    const requestUrl = this.appendTokenToUrl(url, token);
    try {
      return await this.httpService.axiosRef.post(requestUrl, body, { ...config });
    } catch (error) {
      this.logger.verbose(error);
      throw new BadRequestException();
    }
  }

  async put(url: string, token?: string, body?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    const requestUrl = this.appendTokenToUrl(url, token);
    try {
      return await this.httpService.axiosRef.put(requestUrl, body, { ...config });
    } catch (error) {
      this.logger.verbose(error);
      throw new BadRequestException();
    }
  }
}