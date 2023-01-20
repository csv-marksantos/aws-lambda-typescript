import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column('varchar', { length: 50, unique: true })
  email: string;

  @Column('varchar', { length: 50, name: 'first_name' })
  firstName: string;

  @Column('varchar', { length: 50, name: 'middle_name', nullable: true })
  middleName: string;

  @Column('varchar', { length: 50, name: 'last_name' })
  lastName: string;

  @Column('varchar', { length: 255, nullable: true })
  address: string;

  @Column('varchar', { length: 50, nullable: true })
  city: string;

  @CreateDateColumn({ name: 'created_at', readonly: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('boolean', { default: true, name: 'is_active' })
  isActive: boolean;

  // Setters
  @BeforeInsert()
  @BeforeUpdate()
  setProperties(): void {
    this.email = this.email.toLowerCase();
    this.updatedAt = new Date(Date.now());
  }
}
