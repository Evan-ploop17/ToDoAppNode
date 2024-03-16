import * as fs from 'node:fs'

const file = './db/data.json'

export const saveDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data))
}

export const readDB = () => {
    if(!fs.existsSync(file)) return null
    const info = fs.readFileSync(file, {encoding:'utf-8'})
    const data = JSON.parse(info)
    return data
}