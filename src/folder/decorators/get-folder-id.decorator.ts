import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetFolderId = createParamDecorator(
  (data: string | null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const folderId = request.params.folderId;

    if (!folderId) {
      throw new BadRequestException('folderId param is missing');
    }

    return folderId;
  },
);
