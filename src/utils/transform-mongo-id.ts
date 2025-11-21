import { ExposeOptions, Transform } from 'class-transformer';

export function TransformMongoId<T extends object>(options?: ExposeOptions) {
  return (target: T, propertyKey: string): void => {
    Transform((params) => params.obj[propertyKey]?.toString(), options)(
      target,
      propertyKey,
    );
  };
}
