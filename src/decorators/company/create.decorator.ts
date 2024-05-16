import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class CompanyCreate implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if ((data.Address && data.Address.company)) {
          delete data.Address.company;
        }

        if ((data.Authorized && data.Authorized.company)) {
          delete data.Authorized.company;
        }

        return data;

      }),
    );
  }
}