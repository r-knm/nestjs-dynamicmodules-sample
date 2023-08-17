import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/constants';
import { ConfigOptions } from 'src/interfaces';

interface IDynamicService {
  connect(): Promise<any>;
}

@Injectable()
export class DynamicFeatureService implements IDynamicService {
  private myClient: any;

  constructor(@Inject(CONFIG_OPTIONS) private options: ConfigOptions) {}

  async connect(): Promise<any> {
    return this.myClient;
  }
}
