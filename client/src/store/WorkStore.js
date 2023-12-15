import {makeAutoObservable} from "mobx"
export default class WorkStore {
    constructor() {
        this._works = []
        this._task = []
        this._idUser = []
        makeAutoObservable(this)
    }
    setidUser(idUser) {
        this._user = idUser}

    setWorks(works) {
        this._works = works}
    
    setTask(task) {
        this._task = task}

    get idUser() {
       return this._idUser}

    get works() {
    return this._works}
    
    get task() {
        return this._task}
        

}