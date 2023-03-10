import { Module } from "@nestjs/common";
import { ParkModule } from "./park/park.module";

@Module({
    imports: [
        ParkModule
    ],
    controllers: [],
    providers: []
})

export class ApiModule {}