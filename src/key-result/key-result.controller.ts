import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { KeyResultService } from './key-result.service';
import { UpdatedKeyResultDTO } from './dto/updated-key-result.dto';
import { UpdateCurrentProgressDto } from './update-current-progress.dto';

@Controller('/objective/:objectiveId/key-result')
export class KeyResultController {
  constructor(private readonly keyResultService: KeyResultService) {}
  @Get()
  getAllByObjetiveId(@Param('objectiveId', ParseIntPipe) objectiveId: number) {
    console.log(objectiveId);
    return this.keyResultService.getAllByObjectiveId(objectiveId);
  }
  @Get(':keyResultId')
  getOne(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
  ) {
    return this.keyResultService.getOne(objectiveId, id);
  }

  @Put(':keyResultId')
  update(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
    @Body() updateKeyResultDto: UpdatedKeyResultDTO,
  ) {
    return this.keyResultService.updateOne(objectiveId, id, updateKeyResultDto);
  }

  @Delete(':keyResultId')
  delete(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
  ) {
    return this.keyResultService.deleteOne(objectiveId, id);
  }

  @Patch(':keyResultId/progress')
  updateProgress(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
    @Body() updateProgressDto: UpdateCurrentProgressDto,
  ) {
    return this.keyResultService.updateProgress(
      objectiveId,
      id,
      updateProgressDto,
    );
  }
}
