import {makeAutoObservable} from "mobx"
export default class UserStore {
    constructor() {
        this._users = [] //Хранится список сотрудников в отделе
        this._isAuth = false
        this._user = {}
        this._role = ''
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

    get isAuth() {
       return this._isAuth}
    get user() {
       return this._user}

    get users() {
    return this._users}

    get role() {
    return  this._role}
        

}