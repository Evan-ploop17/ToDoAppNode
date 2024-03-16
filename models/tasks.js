import { Task } from './task.js'

export class Tasks {
    _list = {}

    get listArr() {
        const list = []
        Object.keys(this._list).forEach((key) => {
            const task = this._list[key]
            list.push(task)
        })
        return list
    }

    constructor(){
        this._list = {} 
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach((task) => {
            this._list[task.id] = task
        })
    }

    deleteTask = (id = '') => {
        if(this._list[id]){
            delete this._list[id]
        }
    }

    completedList = () => {
        console.log()
        this.listArr.forEach((task, id) => {
            const idx = `${id + 1}`.green
            const { description, completedAt } = task
            const status = completedAt ? `Completado`.bgBlue : `Pendiente`.bgRed
            console.log(`${idx}. ${description} :: ${status}`)
        })
    }

    makeTask(desc = '') {
        const task = new Task(desc)
        this._list[task.id] = task 
    }

    listTaskAccordingStatus = (completed = true) => {
        console.log()
        this.listArr.forEach((task, id) => {
            const idx = `${id + 1}`.green
            let counter = 0
            const { description, completedAt } = task
            const status = completedAt ? `Completado`.bgBlue : `Pendiente`.bgRed
            if(completed){
                if(completedAt){
                    counter += 1
                    console.log(`${(counter + '.'.green)} ${description} :: ${status}`)
                }
            } else {
                if(!completedAt){
                    counter += 1
                    console.log(`${(counter + '.'.green)} ${description} :: ${status}`)
                }
            }
        })
    }

    toggleCompletedTask = (ids = []) => {
        ids.forEach(id => {
            const task = this._list[id]
            if(!task.completedAt){
                task.completedAt = new Date().toISOString()
            }
        })

        this.listArr.forEach(({id}) => {
            if(!ids.includes(id)){
                this._list[id].completedAt = null
            }
        })
    }
}