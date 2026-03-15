import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDTO, TaskStatusEnum } from './task.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class TaskService {

    private tasks: TaskDTO[] = [];
    
    createTask(task: TaskDTO) {
        task.id = uuid();
        task.status = TaskStatusEnum.TO_DO
        return this.tasks.push(task);
    }

    getTasks(){
        return this.tasks;
    }

    getTaskById(id: string){
        const task = this.tasks.find((task) => task.id === id)
        if (task) return task;
        throw new HttpException(`Task de ID ${id} não foi achado`, HttpStatus.NOT_FOUND)
    }

    deleteTaskById(id: string){
        const specificTaskId = this.tasks.findIndex((task) => task.id === id) 
        if ( specificTaskId !== -1) {
            this.tasks.splice(specificTaskId, 1)
            return this.tasks
        } 

        throw new HttpException(`Task de ID ${id} não foi achado`, HttpStatus.NOT_FOUND)
    }

    update(id: string, task: TaskDTO){
        const specificTaskId = this.tasks.findIndex((task) => task.id === id) 
        if ( specificTaskId !== -1) {
            this.tasks[specificTaskId] = {...this.tasks[specificTaskId], ...task}
            return this.tasks
        }

        throw new HttpException(`Task de ID ${id} não foi achado`, HttpStatus.NOT_FOUND)
    }

    findAll(params: FindAllParameters) {

        return this.tasks.filter(task => {
            let match = false;

            if(params.title != undefined && task.title.includes(params.title)){
                match = true
            }

            if(params.status != undefined && task.status.includes(params.status)){
                match = true
            }

            return match;
        })

    }
}
