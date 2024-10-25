import { Module } from '@nestjs/common';
import { MempoolService } from './mempool.service';
import { RpcModule } from '../rpc/rpc.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../common/common.module';
import { ormConfig } from 'src/config/db.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [RpcModule, ConfigModule, CommonModule],
  providers: [
    MempoolService,
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource(ormConfig);
        return await dataSource.initialize();
      },
    },
  ],
  exports: [MempoolService],
})
export class MempoolModule {}
