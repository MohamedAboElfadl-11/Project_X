import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('PPO.USER_DATA')

export class UserData {
  @PrimaryColumn({ name: 'USER_ID', type: 'number' })
  userId!: number;

  @Column({ name: 'APP_ID', type: 'number', nullable: true })
  appId!: number | null;

  @Column({ name: 'USER_DBNAME', type: 'varchar2', length: 50, nullable: true })
  userDbname!: string | null;

  @Column({ name: 'USER_NAME', type: 'varchar2', length: 100, nullable: true })
  userName!: string | null;

  @Column({ name: 'USER_PWD', type: 'varchar2', length: 100, nullable: true })
  userPwd!: string | null;

  @Column({ name: 'USERCLASS_CODE', type: 'number', nullable: true })
  userclassCode!: number | null;

  @Column({ name: 'ACTIVE_FROM', type: 'date', nullable: true })
  activeFrom!: Date | null;

  @Column({ name: 'ACTIVE_TO', type: 'date', nullable: true })
  activeTo!: Date | null;

  @Column({ name: 'RECSTATUS_CODE', type: 'varchar2', length: 1, nullable: true })
  recstatusCode!: string | null;

  @Column({ name: 'CREATED_BY', type: 'varchar2', length: 50, nullable: true })
  createdBy!: string | null;

  @Column({ name: 'CREATED_DATE', type: 'date', nullable: true })
  createdDate!: Date | null;

  @Column({ name: 'MODIFIED_BY', type: 'varchar2', length: 50, nullable: true })
  modifiedBy!: string | null;

  @Column({ name: 'MODIFIED_DATE', type: 'date', nullable: true })
  modifiedDate!: Date | null;
}