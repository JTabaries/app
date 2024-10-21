import {readdir, stat} from 'node:fs/promises'

const files =await readdir('./',{withFileTypes:true})
for (const file of files){
    const parts=[
        file.isDirectory() ? 'D' : 'F',
        file.name
    ]
    if(!file.isDirectory()){
        const {size} = await stat(file.name)
        parts.push(`${size}o`)
    }
    console.log(parts.join(' - '))
}