import { Module } from '@nestjs/common';
import { KeyResultController } from './key-result.controller';
import { KeyResultService } from './key-result.service';
import { PrismaService } from '../prisma.service';
import { ObjectiveService } from '../objective/objective.service';

@Module({
  controllers: [KeyResultController],
  providers: [KeyResultService, PrismaService, ObjectiveService],
})
export class KeyResultModule {}
