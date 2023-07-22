import { DynamicModule, Module } from '@nestjs/common';
import { SRCH_OPTIONS } from 'src/constants';
import { DynamicFeatureService } from './dynamic-feature.service';

@Module({})
export class DynamicFeatureModule {
  static register(options: {}): DynamicModule {
    return {
      module: DynamicFeatureModule,
      providers: [
        {
          provide: SRCH_OPTIONS,
          useValue: options,
        },
        DynamicFeatureService,
      ],
      exports: [DynamicFeatureService],
    };
  }
}
