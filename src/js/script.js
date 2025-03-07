import {currentYear, loadData} from './modules/dom.js' 
import { fetchResourceMedia, fetchResourcesTopic } from './modules/api.js'


document.addEventListener('DOMContentLoaded', ()=>{
    currentYear()
    loadData()

    fetchResourceMedia()
    fetchResourcesTopic()
})