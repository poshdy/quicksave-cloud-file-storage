import { Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';

@Injectable()
export class FileServiceHelper {
  generateUniqueObjectName(bytes: number = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }
}
