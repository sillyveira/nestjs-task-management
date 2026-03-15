import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { FindAllParameters, TaskDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @HttpCode(200)
    createTask(@Body() task: TaskDTO) {
        return this.taskService.createTask(task);
    }

    @Get()
    @HttpCode(200)
    getTasks(){
        return this.taskService.getTasks();
    }

    @Get('/id/:id')
    @HttpCode(200)
    getById(@Param() params: any){
        return this.taskService.getTaskById(params.id);
    }

    @Get('search')
    @HttpCode(200)
    findAll(@Query() params: FindAllParameters): TaskDTO[] {
        return this.taskService.findAll(params);
    }
    

    @Delete(':id')
    deleteById(@Param() params: any) {
        if(params.id){
            return this.taskService.deleteTaskById(params.id)
        } else {
            return "Informe um ID!"
        }
    }
    
    @Put(':id')
    update(@Param() params: any, @Body() task: TaskDTO) {
        if(params.id){
            return this.taskService.update(params.id, task)
        } else {
            return "Informe um ID!"
        }
    }
    
}
