import {makeAutoObservable} from "mobx"
export default class StatisticsStore {
    constructor() {
        this._userInfo = {}
        this._allProject = {}
        this._allTask = {}
        this._detailProject = {}
        this._currentWork = {}
        this._detailTask = {}
        makeAutoObservable(this)
    }

    setUserInfo(userInfo) {
        this._userInfo = userInfo}
    
    setAllProject(allProject) {
        this._allProject = allProject}
        
    setAllTask(allTask) {
        this._allTask = allTask}
    
    setDetailProject(detailProject) {
        this._detailProject = detailProject}

    setCurrentWork(currentWork) {
        this._currentWork = currentWork}
        
    setDetailTask(detailTask) {
        this._detailTask = detailTask}

    get userInfo() {
       return this._userInfo}
    
    get allProject() {
        return this._allProject}
        
    get allTask() {
        return this._allTask}

    get detailProject() {
            return this._detailProject}
            
    get currentWork() {
        return this._currentWork}
                    
    get detailTask() {
        return this._detailTask}
     
}