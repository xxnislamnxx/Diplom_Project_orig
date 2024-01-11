import {makeAutoObservable} from "mobx"
export default class WorkStore {
    constructor() {
        this._works = []
        this._task = []
        this._comments = []
        this._idUser = []
        this._selectedWork = {}
        this._selectedTask = {}
        this._sortCol = ''
        this._sortDir = ''
        makeAutoObservable(this)
    }
    
    setidUser(idUser) {
        this._user = idUser} // Надо проверить, не используется походу
    
    setSortCol(SortCol) {
        this._SortCol = SortCol}
    setSortDir(SortDir) {
        this._SortDir = SortDir}
             
    setWorks(works) {
        this._works = works}
    
    setTask(task) {
        this._task = task}

    setComments(comments) {
        this._comments = comments}
        
    setSelectedWork(work) {
        this._selectedWork = work}

    setSelectedTask(task) {
        this._selectedTask = task}

    get idUser() {
       return this._idUser}
    
    get SortCol() {
        return this._SortCol}
    get SortDir() {
        return this._SortDir}


    get works() {
    return this._works}
    
    get task() {
        return this._task}
        
    get selectedWork() {
        return this._selectedWork}

    get selectedTask() {
        return this._selectedTask}
        
    
    get comments() {
    return this._comments}

}