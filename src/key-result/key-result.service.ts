import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdatedKeyResultDTO } from './dto/updated-key-result.dto';
import { ObjectiveService } from '../objective/objective.service';
import { Prisma } from '../../generated/prisma/client';
import { UpdateCurrentProgressDto } from './update-current-progress.dto';

@Injectable()
export class KeyResultService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly objectiveService: ObjectiveService,
  ) {}
  getAllByObjectiveId(objectiveId: number) {
    return this.prismaService.keyResult.findMany({
      where: { objectiveId },
    });
  }

  async getOne(objectiveId: number, id: number) {
    const objective = await this.prismaService.objective.findUnique({
      where: {
        id: objectiveId,
      },
      include: {
        keyResults: true,
      },
    });
    if (!objective) {
      throw new NotFoundException(
        `Objective with ObjectiveId {objectiveId} not found.`,
      );
    }
    const keyResultIndex = objective.keyResults.findIndex((kr) => kr.id === id);
    if (keyResultIndex === -1) {
      throw new NotFoundException(`Key result with {id} not found.`);
    }
    return objective.keyResults[keyResultIndex];
  }

  async updateOne(
    objectiveId: number,
    id: number,
    updatedKeyResultDto: UpdatedKeyResultDTO,
  ) {
    await this.objectiveService.getOne(objectiveId);
    try {
      return this.prismaService.keyResult.update({
        where: {
          id,
        },
        data: { ...updatedKeyResultDto },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        //   #### Create Custom Error ####
        throw new NotFoundException(`Key result with {id} not found.`);
      }
    }
  }

  async deleteOne(objectiveId: number, id: number) {
    await this.objectiveService.getOne(objectiveId);
    return this.prismaService.keyResult.delete({
      where: {
        id,
      },
    });
  }

  async updateProgress(
    objectiveId: number,
    id: number,
    updateProgressDto: UpdateCurrentProgressDto,
  ) {
    await this.objectiveService.getOne(objectiveId);
    await this.prismaService.keyResult.update({
      where: {
        id,
      },
      data: {
        currentProgress: updateProgressDto.currentProgress,
      },
    });

    return this.objectiveService.updateStatus(objectiveId, true);
  }
}
