import { BadRequestException, Injectable } from '@nestjs/common';
import { Park, ParkAction } from '@prisma/client';
import { CreateParkDetailDto, CreateParkDto, UpdateParkDto } from 'src/dto/park.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ParkService {
    constructor(private readonly prisma: PrismaService) { }

    //Park Model
    async createPark(payload: CreateParkDto) {
        try {
            return await this.prisma.park.create({
                data: payload
            })
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async getAllPark() {
        try {
            return await this.prisma.park.findMany()
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async getPark(parkId: Park["id"]) {
        try {
            return await this.prisma.park.findUniqueOrThrow({
                where: {
                    id: parkId
                }
            })
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async updateParkDetail(parkId: Park["id"], payload: UpdateParkDto) {
        try {
            return await this.prisma.park.update({
                where: {
                    id: parkId
                },
                data: payload
            })
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async deletePark(parkId: Park["id"]) {
        try {
            return await this.prisma.park.delete({
                where: {
                    id: parkId
                }
            })
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    //Park Detail Model
    async createParkDetail(payload: CreateParkDetailDto) {
        try {
            const park = await this.prisma.park.findUniqueOrThrow({
                where: {
                    id: payload.parkAt
                }
            })

            if(payload.action === ParkAction.IN && park.currentPark < park.parkCap){
                const parkCar = await this.prisma.parkDetail.create({
                    data: payload
                })

                await this.prisma.park.update({
                    where: {
                        id: payload.parkAt
                    },
                    data: {
                        currentPark: {
                            increment: 1
                        }
                    }
                })

                return parkCar
            }
            else if(payload.action === ParkAction.OUT && park.currentPark > 0){
                const carLeft = await this.prisma.parkDetail.create({
                    data: payload
                })

                await this.prisma.park.update({
                    where:{
                        id:  payload.parkAt
                    },
                    data: {
                        currentPark: {
                            decrement: 1
                        }
                    }
                })

                return carLeft
            }
            else{
                throw new Error("Park is full or empty.")
            }
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async getAllParkDetail(){
        try {
            return await this.prisma.parkDetail.findMany()
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }

    async getPrakDetail(parkId: Park["id"]){
        try {
            return await this.prisma.parkDetail.findMany({
                where: {
                    parkAt: parkId 
                }
            })
        }
        catch(error){
            throw new BadRequestException(error.message)
        }
    }
}
