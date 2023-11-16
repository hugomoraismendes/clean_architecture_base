import { Entity, Result } from '@entities';

export type ParameterStoreProps = {
  id?: number;
  key: string;
  value: string;
};

export class ParameterStore extends Entity<ParameterStoreProps> {
  private constructor(props: ParameterStoreProps) {
    super(props);
  }

  public static build(props: ParameterStoreProps): Result<ParameterStore> {
    return Result.success<ParameterStore>(new ParameterStore(props));
  }

  getProps(): ParameterStoreProps {
    return this.props;
  }

  get id(): number {
    return this.props.id;
  }

  get key(): string {
    return this.props.key;
  }

  get value(): string {
    return this.props.value;
  }
}
