import { Prisma } from '../../../generated/prisma/client';

export type ObjectiveWithKeyResults = Prisma.ObjectiveGetPayload<{
  include: { keyResults: true };
}>;
