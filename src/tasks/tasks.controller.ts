import { Controller, HttpCode, Get, Delete, Post, Body, Param, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] | string {
        return this.tasksService.getAllTasks()
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task | string {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @HttpCode(201)
    addTask(
        @Body('title') title: string,
        @Body('description') description: string,
    ): Task {
        return this.tasksService.addTask(title, description)
    }

    @Put(':id')
    moveTask(
        @Param('id') id: string,
        @Body('newStatus') newStatus: string
    ): Task | string {
        return this.tasksService.moveTaskById(id, newStatus)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): string {
        return this.tasksService.deleteTaskById(id)
    }

    @Delete()
    deleteAll(
    ): string {
        return this.tasksService.deleteAllTasks()
    }
} 