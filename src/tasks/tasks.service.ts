import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';

const TASK_NOT_FOUND = "Can't find task with given id"
const ALL_TASKS_DELETED = "All tasks were deleted!"
const TASK_DELETED_SUCCESFULLY = "Task has been deleted succesfully!"
const ARRAY_IS_EMPTY = "Array is empty!"
const CANNOT_MOVE_TO_PREVIOUS_STEP = "A task in Done status cannot be reopened"
const PROVIDED_STATUS_NOT_VALID = "Provided task status is not a valid status"

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    private cleanTasks() {
        this.tasks = []
    }

    getAllTasks(): Task[] | string {
        return this.tasks.length === 0 ? ARRAY_IS_EMPTY : this.tasks
    }

    deleteAllTasks(): string {
        this.cleanTasks()
        return ALL_TASKS_DELETED
    }

    private getIndexById(id: string): number {
        console.log(id);
        return this.tasks.findIndex((task) => {
            return task.id === id
        })
    }

    getTaskById(id: string): Task | string {
        const taskIndex = this.getIndexById(id)
        if (taskIndex > -1) {
            return this.tasks[taskIndex]
        } else {
            return TASK_NOT_FOUND
        }
    }

    deleteTaskById(id: string): string {
        const taskIndex = this.getIndexById(id)
        if (taskIndex > -1) {
            this.tasks.splice(taskIndex, 1)
            return TASK_DELETED_SUCCESFULLY
        } else {
            return TASK_NOT_FOUND
        }
    }

    addTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    moveTaskById(id: string, newStatus: string): Task | string {
        if (newStatus !== TaskStatus.OPEN && newStatus !== TaskStatus.IN_PROGRESS && newStatus !== TaskStatus.DONE)
            return PROVIDED_STATUS_NOT_VALID
        const taskIndex = this.getIndexById(id)
        if (taskIndex > -1) {
            if (this.tasks[taskIndex].status == TaskStatus.DONE) {
                return CANNOT_MOVE_TO_PREVIOUS_STEP
            } else {
                this.tasks[taskIndex].status = newStatus
                return this.tasks[taskIndex]
            }
        } else {
            return TASK_NOT_FOUND
        }
    }
}
