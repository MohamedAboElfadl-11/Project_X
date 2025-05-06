import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('PPO.EMP_DATA')
export class EmpData {
    @PrimaryColumn({ name: 'EMP_ID', type: 'number' })
    empId!: number;

    @Column({ name: 'APP_ID', type: 'number', nullable: true })
    appId!: number | null;

    @Column({ name: 'EMP_NAME', type: 'varchar2', length: 100, nullable: true })
    empName!: string | null;

    @Column({ name: 'FP_ID', type: 'number', nullable: true })
    fpId!: number | null;

    @Column({ name: 'NID', type: 'varchar2', length: 20, nullable: true })
    nid!: number | null;

    @Column({ name: 'EMP_PHOTO', type: 'blob', nullable: true })
    empPhoto!: Buffer | null;

    @Column({ name: 'BIRTH_DATE', type: 'date', nullable: true })
    birthDate!: Date | null;

    @Column({ name: 'GENDER_CODE', type: 'number', nullable: true })
    genderCode!: number | null;

    @Column({ name: 'NATIONALITY_CODE', type: 'number', nullable: true })
    nationalityCode!: number | null;

    @Column({ name: 'RELIGION_CODE', type: 'number', nullable: true })
    religionCode!: number | null;

    @Column({ name: 'MARITALSTATUS_CODE', type: 'number', nullable: true })
    maritalstatusCode!: number | null;

    @Column({ name: 'MILITARYSERVICE_CODE', type: 'number', nullable: true })
    militaryserviceCode!: number | null;

    @Column({ name: 'MOBILE_NO', type: 'varchar2', length: 20, nullable: true })
    mobileNo!: string | null;

    @Column({ name: 'EMAIL_ADDRESS', type: 'varchar2', length: 100, nullable: true })
    emailAddress!: string | null;

    @Column({ name: 'EMPSTATUS_CODE', type: 'number', nullable: true })
    empstatusCode!: number | null;

    @Column({ name: 'ADDRESS', type: 'varchar2', length: 255, nullable: true })
    address!: string | null;

    @Column({ name: 'BANK_CODE', type: 'number', nullable: true })
    bankCode!: number | null;

    @Column({ name: 'BANKBRANCH_CODE', type: 'number', nullable: true })
    bankbranchCode!: number | null;

    @Column({ name: 'BANKACCOUNT_NO', type: 'varchar2', length: 50, nullable: true })
    bankaccountNo!: string | null;

    @Column({ name: 'RECSTATUS_CODE', type: 'number', nullable: true })
    recstatusCode!: number | null;

    @Column({ name: 'CREATED_BY', type: 'varchar2', length: 50, nullable: true })
    createdBy!: string | null;

    @Column({ name: 'CREATED_DATE', type: 'date', nullable: true })
    createdDate!: Date | null;

    @Column({ name: 'MODIFIED_BY', type: 'varchar2', length: 50, nullable: true })
    modifiedBy!: string | null;

    @Column({ name: 'MODIFIED_DATE', type: 'date', nullable: true })
    modifiedDate!: Date | null;
}