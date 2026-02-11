import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

@Controller('objective')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}
  @Get()
  getAll() {
    return this.objectiveService.getAll();
  }

  @Post()
  create(@Body() objectiveDto: CreateObjectiveDto) {
    return this.objectiveService.create(objectiveDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.deleteById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedObjective: UpdateObjectiveDto,
  ) {
    return this.objectiveService.updateById(id, updatedObjective);
  }
  @Patch(':id')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.updateStatus(id, false);
  }
}
