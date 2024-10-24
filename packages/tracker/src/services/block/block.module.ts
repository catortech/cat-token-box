import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { RpcModule } from '../rpc/rpc.module';
import { BlockEntity } from '../../entities/block.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TxModule } from '../tx/tx.module';
import { CommonModule } from '../common/common.module';
import { DataSource } from 'typeorm';
import { ormConfig } from 'src/config/db.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockEntity]),
    RpcModule,
    TxModule,
    ConfigModule,
    CommonModule,
  ],
  providers: [
    BlockService,
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource(ormConfig);
        return await dataSource.initialize();
      },
    },
  ],
  exports: [BlockService],
})
export class BlockModule {}
