import axios from 'axios'
import * as url from "url";

let Service = (() => {
    const HOST = 'localhost', // Хост сервера на который идут запросы
        PORT = '5000', // Порт сервера на который идут запросы
        URL = "http://" + HOST + ":" + PORT, // url сервера
        URLs = { // Список Url для запросов
            getAllNotes: {name: "getAllNotes", type: "get"}
        }

    let exportObj = {}

    for (let urlName in URLs) {
        const obj = URLs[urlName],
            fullUrl = URL + "/" + urlName
        exportObj[urlName] = function (props) {
            axios[obj.type](fullUrl, props['data']).then(response => {
                props["cb"](response)
            })
        }
    }

    return exportObj
})()

export default Service
