//Тут объявляется таблицы в базе данных
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User',
 {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name:{type: DataTypes.STRING(100), unique: false},
    Login:{type: DataTypes.STRING(100), unique: true},
    Password:{type: DataTypes.STRING(100), unique: false},
    Role:{type: DataTypes.STRING(10), unique: false},
    PostId:{type: DataTypes.INTEGER},
    DateTimeChange:{type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    
},{timestamps: false})
const Otdel = sequelize.define('Otdel', 
{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Name:{type: DataTypes.STRING(100) },
    Director_Id:{type: DataTypes.INTEGER },
    DateTimeChange:{type: DataTypes.DATE, defaultValue: DataTypes.NOW},
},{timestamps: false})

const WorkList = sequelize.define('WorkList', 
{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Otdel_id:{type: DataTypes.INTEGER },
    Text:{type: DataTypes.STRING(100) },
    Completed:{type: DataTypes.BOOLEAN, defaultValue: false},
},{timestamps: false})


const TaskList = sequelize.define('TaskList', 
{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Work_id:{type: DataTypes.INTEGER },
    User_id:{type: DataTypes.INTEGER },
    Text:{type: DataTypes.STRING(100)},
    Completed:{type: DataTypes.BOOLEAN, defaultValue: false},
},{timestamps: false})


// 1 ко многим
Otdel.hasMany(User, {sourceKey: 'id',foreignKey: 'Otdel_id'})
WorkList.hasMany(TaskList, {sourceKey: 'id',foreignKey: 'Work_id'})



module.exports = {User,Otdel,WorkList,TaskList}