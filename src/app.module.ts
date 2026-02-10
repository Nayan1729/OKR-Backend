import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectiveModule } from './objective/objective.module';
import { KeyResultModule } from './key-result/key-result.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ObjectiveModule,
    KeyResultModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
