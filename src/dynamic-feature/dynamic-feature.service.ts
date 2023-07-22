import { Inject, Injectable } from '@nestjs/common';
import { SRCH_OPTIONS } from 'src/constants';

@Injectable()
export class DynamicFeatureService<T> {
  constructor(
    @Inject(SRCH_OPTIONS)
    private options: {},
  ) {}
}
