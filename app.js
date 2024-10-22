import {createServer} from 'node:http'
import { create, index } from './functions/api/todos.js'
import { NotFoundError } from './functions/errors.js'

createServer(async (req,res)=>{
    try {
        res.setHeader('Content-Type','application/json')
        const url = new URL(req.url, `http://${req.headers.host}`)
        const endpoint = `${req.method}:${url.pathname}`
        let results
        switch (endpoint) {
            case 'GET:/todos':
                results = await index(req,res)
                break;
            case 'POST:/todos':
                results = await create(req,res)
                break;
            case 'DELETE:/todos':
                results = await remove(req,res,url)
                break;
            default:
                res.writeHead(404)
        }
        if(results){
            res.write(JSON.stringify(results))
        }
        
    } catch (error) {
        if(error instanceof NotFoundError){
            res.writeHead(404)
        }else{
            throw error
        }
    }
    res.end()
}).listen(3000) 