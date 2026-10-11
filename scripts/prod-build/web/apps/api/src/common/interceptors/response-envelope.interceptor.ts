import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import type { ApiSuccess } from '@maasetu/shared';

/**
 * Wraps every successful response in the standard envelope
 * `{ success: true, data }` so clients can rely on a single response shape.
 * The contract is declared in `@maasetu/shared`.
 */
@Injectable()
export class ResponseEnvelopeInterceptor<TData>
  implements NestInterceptor<TData, ApiSuccess<TData>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<TData>,
  ): Observable<ApiSuccess<TData>> {
    return next.handle().pipe(map((data) => ({ success: true, data })));
  }
}
