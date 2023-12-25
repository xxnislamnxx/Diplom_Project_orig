import {makeAutoObservable} from "mobx"
export default class UserStore {
    constructor() {
        this._users = [] //Хранится список сотрудников в отделе
        this._isAuth = false
        this._user = {}
        this._role = ''
        this._token = [{id:0,Name:'Гость',Login:'',Role:'Guest',PostId:0,Otdel_id:0}]
        
        makeAutoObservable(this)
    }
    setRole(role) {
        this._role = role}
    setIsAuth(bool) {
        this._isAuth = bool}
    setUser(user) {
        this._user = user}

    setUsers(users) {
        this._users = users}
    
    setToken(token) {
        return this._token = token}
    get isAuth() {
       return this._isAuth}
    get user() {
       return this._user}

    get users() {
    return this._users}

    get role() {
    return  this._role}
    
    get token() {
    return this._token
    }
}