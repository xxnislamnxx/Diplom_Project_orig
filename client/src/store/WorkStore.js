import {makeAutoObservable} from "mobx"
export default class WorkStore {
    constructor() {
        this._works = []
        this._task = []
        this._idUser = []
        this._selectedWork = {}
        this._selectedTask = {}
        makeAutoObservable(this)
    }
    
    setidUser(idUser) {
        this._user = idUser}

    setWorks(works) {
        this._works = works}
    
    setTask(task) {
        this._task = task}

        
    setSelectedWork(work) {
        this._selectedWork = work}

    setSelectedTask(task) {
        this._selectedTask = task}

    get idUser() {
       return this._idUser}

    get works() {
    return this._works}
    
    get task() {
        return this._task}
        
    get selectedWork() {
        return this._selectedWork}

    get selectedTask() {
        return this._selectedTask}
            

}