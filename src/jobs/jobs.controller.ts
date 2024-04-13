import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {  CreateJobsDto } from './dtos/create-jobs.dto';

@Controller('jobs')
export class JobsController {

    @Get()
    getJobs() {

    }

    @Get("/:id")
    getJob(@Param("id") id:string){
        console.log(id);
        
    }

    @Post("/new")
    createJob(@Body() body:CreateJobsDto){
        console.log(body);
    }

    @Delete("/delete/:id")
    deleteJob(){

    }

    @Post("/update/:id")
    updateJob(){

    }


}
