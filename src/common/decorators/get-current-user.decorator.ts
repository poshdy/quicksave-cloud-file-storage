import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | null, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    if (!request.user) throw new UnauthorizedException('access denied');
    return request.user[data];
  },
);
