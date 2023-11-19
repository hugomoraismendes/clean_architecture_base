import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  DataType,
  Unique
} from 'sequelize-typescript';

@Table({
  tableName: 'outages',
  modelName: 'outage',
  name: {
    singular: 'outage',
    plural: 'outages'
  },
  timestamps: true,
  underscored: true
})
export class ParameterStoreModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT.UNSIGNED)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  @Unique
  declare key: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare value: string;

  @CreatedAt
  @Column
  declare created_at: Date;

  @UpdatedAt
  @Column
  declare updated_at: Date;
}
