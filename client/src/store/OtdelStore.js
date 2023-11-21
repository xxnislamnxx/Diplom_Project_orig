import {makeAutoObservable} from "mobx"
export default class OtdelStore {
    constructor() {
        this._otdel = [
            {id: 1, Name: 'MES', Director_Id: 1},
            {id: 2, Name: 'КСОДУ', Director_Id: 1},
            {id: 3, Name: 'PIMS', Director_Id: 1}
        ]
        makeAutoObservable(this)
    }

    setOtdel(otdel) {
        this._otdel = otdel}

    get otdel() {
       return this._otdel}

        

}