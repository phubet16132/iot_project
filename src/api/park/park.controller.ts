import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Park } from '@prisma/client';
import { CreateParkDetailDto, CreateParkDto, UpdateParkDto } from 'src/dto/park.dto';
import { ParkService } from './park.service';

@Controller('park')
export class ParkController {
    constructor (private readonly parkService: ParkService) {}
    //Park Detail
    @Post("detail")
    async park(@Body() payload: CreateParkDetailDto){
        return await this.parkService.createParkDetail(payload)
    }

    @Get("/detail")
    async getAllParkDetail() {
        return await this.parkService.getAllParkDetail()
    }

    @Get(":id/detail")
    async getParkDetail(@Param("id") parkId: Park["id"]){
        return await this.parkService.getPrakDetail(parkId)
    }

    // Park
    @Post()
    async createPark(@Body() payload: CreateParkDto){
        return await this.parkService.createPark(payload)
    }

    @Get()
    async getAllPark(){
        return await this.parkService.getAllPark()
    }

    @Get(":id")
    async getPark(@Param("id") parkId: Park["id"]){
        return await this.parkService.getPark(parkId) 
    }

    @Put(":id")
    async updateParkData(
        @Param("id") parkId: Park["id"],
        @Body() payload: UpdateParkDto
    ){
        return await this.parkService.updateParkDetail(parkId, payload)
    }

    // @Delete("id")
    // async deletePark(@Param("id") parkId: Park["id"]){
    //     return await this.parkService.deletePark(parkId)
    // }
}
