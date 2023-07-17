import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAll() {
    return 'findAll method is called.';
  }
}
