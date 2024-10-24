import { Module } from '@nestjs/common';
import { TxService } from './tx.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TxEntity } from '../../entities/tx.entity';
import { TokenInfoEntity } from '../../entities/tokenInfo.entity';
import { CommonModule } from '../common/common.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RpcModule } from '../rpc/rpc.module';
import { TokenOrderEntity } from '../../entities/tokenOrder.entity';
import { DataSource } from 'typeorm';
import { ormConfig } from 'src/config/db.config';
@Module({
  imports: [
    TypeOrmModule.forFeature([TxEntity, TokenInfoEntity, TokenOrderEntity]),
    CommonModule,
    RpcModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    TxService,
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource(ormConfig);
        return await dataSource.initialize();
      },
    },
  ],
  exports: [TxService],
})
export class TxModule {}
