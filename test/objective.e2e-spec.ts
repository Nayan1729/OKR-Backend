import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import request from 'supertest';
import { afterEach } from 'node:test';

describe('objective', () => {
  let app: INestApplication<App>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    const prisma = app.get(PrismaService);
    await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "KeyResult", "Objective" RESTART IDENTITY CASCADE;
  `);
  });
  describe('GET /objective', () => {
    it('should return all objectives', async () => {
      const prismaService = app.get(PrismaService);

      await prismaService.objective.deleteMany({});

      const objective = {
        title: 'Objective',
        description: 'Objective',
      };

      const createdObjective = await prismaService.objective.create({
        data: objective,
        include: { keyResults: true },
      });

      return request(app.getHttpServer())
        .get('/objective')
        .expect(200)
        .expect([
          {
            id: createdObjective.id,
            title: 'Objective',
            description: 'Objective',
            createdAt: createdObjective.createdAt.toISOString(),
            updatedAt: createdObjective.updatedAt.toISOString(),
            keyResults: [],
            isCompleted: false,
          },
        ]);
    });
  });
  describe('POST /objective', () => {
    it('should create a objective and return the created objective', async () => {
      const objective = {
        title: 'Objective',
        description: 'Objective',
      };

      const response = await request(app.getHttpServer())
        .post('/objective')
        .send(objective)
        .expect(201);

      expect(response.body).toEqual({
        title: 'Objective',
        description: 'Objective',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(Number),
        isCompleted: false,
        keyResults: [],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdAt: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        updatedAt: expect.any(String),
      });
    });
  });
});
