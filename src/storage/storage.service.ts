import { Injectable } from '@nestjs/common';
import {
  GetSignedUrlConfig,
  GetSignedUrlResponse,
  Storage,
} from '@google-cloud/storage';
import { IStorage } from './interfaces/storage.interface';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {}
  private readonly storage = new Storage({
    keyFilename: path.join(
      __dirname,
      `../../${this.configService.getOrThrow('CREDENTIALS')}`,
    ),
    projectId: this.configService.getOrThrow('PROJECT_ID'),
  });
  private bucket = this.storage.bucket(
    this.configService.getOrThrow('BUCKET_NAME'),
  );

  async download(stream: Response, objectName: string) {
    const file = this.bucket.file(objectName).createReadStream();
    file.on('data', (chunk) => {
      stream.pipe(chunk);
    });
    file.on('end', () => {
      console.log('ended');
      stream.end();
    });
    file.on('error', (err) => {
      console.log(err);
    });
  }
  async get() {
    const buckets = await this.storage.getBuckets();
    console.log(buckets);
  }

  async upload(file: Express.Multer.File, objectName: string): Promise<void> {
    const fileHandle = await this.bucket.file(objectName);
    const writeStream = fileHandle.createWriteStream({
      resumable: true,
      metadata: {
        contentType: file.mimetype,
        contentLength: file.size,
      },
    });

    writeStream.end(file.buffer);

    writeStream.on('finish', () => {
      return true;
    });
  }

  async genearateSignedUrl(objectName: string): Promise<string> {
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000,
      contentType: 'application/octet-stream',
    };

    const [url] = await this.bucket.file(objectName).getSignedUrl(options);
    return url;
  }

  async delete(objectName: string) {
    await this.bucket.file(objectName).delete();
  }
}
