import {makeAutoObservable} from "mobx"
export default class OtdelStore {
    constructor() {
        this._otdel = []
        /*
            {id: 1, Name: 'MES', Director_Id: 1},
            {id: 2, Name: 'КСОДУ', Director_Id: 1},
            {id: 3, Name: 'PIMS', Director_Id: 1},
            {id: 4, Name: 'СМЗиС', Director_Id: 1},
            {id: 5, Name: 'АСКУЭ', Director_Id: 1},
        ]
        */
        
        this._OneOtdel = []
        this._selectedOtdel = {}
        makeAutoObservable(this)
    }
    setOneOtdel(otdel) {
        this._OneOtdel = otdel}

    setOtdel(otdel) {
        this._otdel = otdel}
    
    setSelectedOtdel(otdel) {
        this._selectedOtdel = otdel}
    
    setUsers(users) {
        this._users = users}



    get otdels() {
       return this._otdel}
    
    get users() {
    return this._users}
    
    get selectedOtdel() {
    return this._selectedOtdel}

    get OneOtdel() {
        return this._OneOtdel}
    
}