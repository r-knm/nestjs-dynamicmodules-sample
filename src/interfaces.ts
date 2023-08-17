import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

interface ConfigAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<OptionsFactory>;
  useClass?: Type<OptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ConfigOptions> | ConfigOptions;
}

interface ConfigOptions {
  myOption: string;
}

interface OptionsFactory {
  createMassiveConfigOptions?: () => Promise<ConfigOptions> | ConfigOptions;
}

export { ConfigAsyncOptions, ConfigOptions, OptionsFactory };
