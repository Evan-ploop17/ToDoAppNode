import inquirer from 'inquirer'
import 'colors'

const questions = [ 
    {
        type: 'list',
        name: 'option',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borar tarea'
            },
            {
                value: '7',
                name: '0. salir'
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log('========================='.green)
    console.log( 'Seleccione una opción'.green )
    console.log('========================='.green)

    const opt = await inquirer.prompt(questions)
    return opt
}

const pause = async () => {
    return await inquirer.prompt([{
        type: 'input',
        name: 'enter',
        message: `Presione ${ 'enter'.green } para continuar`
    }])
}

const readInput = async (message = '') => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message, //Mensaje que sale por consola
            validate(value) {
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listTaskDelete = async (tasks = []) => {
    console.log('tasks', tasks)
    
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.green
        return {
            value: task.id,
            name: `${idx} ${task.description}`
        }
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices,
        }
    ]

    const { id } = await inquirer.prompt(questions)
    return id
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok 
}

const showListCheckItems = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}`.green
        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: (task.completedAt) ? true : false,
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices,
        }
    ]

    const { ids } = await inquirer.prompt(question)
    return ids
}

export {
    confirm,
    inquirerMenu,
    listTaskDelete,
    pause,
    readInput,
    showListCheckItems,
}