import { 
    confirm,
    inquirerMenu,
    listTaskDelete,
    pause,
    readInput,
    showListCheckItems,
} from './helpers/inquirer.js'
import { Tasks } from './models/tasks.js'
import { readDB, saveDB } from './helpers/saveFile.js'

import 'colors'


const main = async () => {
    console.clear()
    let opt = ''
    const tasks = new Tasks()

    const taskDB = readDB()
    if(taskDB){
        tasks.loadTasksFromArray(taskDB)
    }

    do {

        // DE manera manual con promesas y otra con async 
        // mostrarMenu()
        //     .then((devuelve) => {
        //         console.log('devuelve: ', devuelve)
        //         opt = devuelve
        //     })
        // opt = await mostrarMenu()
        // if(opt !== '0') await pausa()

        // USANDO LA LIBRERIA DE INQUIRER
        const { option } = await inquirerMenu()
        const opt = option

        switch (opt) {
            case '1':  // crear tarea
                const desc = await readInput('Agrega una descripción')
                tasks.makeTask(desc)
            break

            case '2':  // listar tareas
                tasks.completedList()
            break

            case '3':  // Listar completadas
                tasks.listTaskAccordingStatus()
            break

            case '4': // Listar pendientes
                tasks.listTaskAccordingStatus(false)
            break

            case '5': // Completado | Pendiente
                const ids = await showListCheckItems(tasks.listArr)
                tasks.toggleCompletedTask(ids)
            break

            case '6':  // Borrar tareas
                const id = await listTaskDelete(tasks.listArr)
                const ok = await confirm('¿Estás seguro?')
                if(ok) tasks.deleteTask(id)

            break
        }

        saveDB(tasks.listArr)

        await pause()

    } while (opt !== '7');
}

main()