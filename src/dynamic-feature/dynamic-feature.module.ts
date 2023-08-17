import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/constants';
import { DynamicFeatureService } from './dynamic-feature.service';
import {
  ConfigAsyncOptions,
  ConfigOptions,
  OptionsFactory,
} from 'src/interfaces';

const connectionFactory = {
  provide: CONFIG_OPTIONS,
  useFactory: async (dynamicFeatureService: DynamicFeatureService) => {
    return dynamicFeatureService.connect();
  },
  inject: [DynamicFeatureService],
};

@Module({})
export class DynamicFeatureModule {
  public static register(options: ConfigOptions): DynamicModule {
    return {
      module: DynamicFeatureModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        DynamicFeatureService,
      ],
      exports: [DynamicFeatureService],
    };
  }

  public static registerAsync(options: ConfigAsyncOptions): DynamicModule {
    return {
      module: DynamicFeatureModule,
      imports: options.imports || [],
      providers: [
        this.createConfigAsyncProviders(options),
        connectionFactory,
        DynamicFeatureService,
      ],
      exports: [DynamicFeatureService, connectionFactory],
    };
  }

  private static createConfigAsyncProviders(
    options: ConfigAsyncOptions,
  ): Provider {
    if (options) {
      if (options.useFactory) {
        return {
          provide: CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        };
      } else {
        // For useClass and useExisting...
        return {
          provide: CONFIG_OPTIONS,
          useFactory: async (optionsFactory: OptionsFactory) =>
            await optionsFactory.createMassiveConfigOptions(),
          inject: [options.useExisting || options.useClass],
        };
      }
    } else {
      return {
        provide: CONFIG_OPTIONS,
        useValue: {},
      };
    }
  }
}
