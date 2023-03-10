import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ParkController } from './park.controller';
import { ParkService } from './park.service';

@Module({
  controllers: [ParkController],
  providers: [ParkService, PrismaService]
})
export class ParkModule {}
