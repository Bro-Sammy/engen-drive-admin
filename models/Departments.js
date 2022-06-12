import { Schema, model, models } from "mongoose";

const ObjectId = Schema.Types.ObjectId

const DepartmentSchema = new Schema({
    departmentName: {type: String},
    branchID: {
        type: ObjectId,
        ref: 'Branches'
    },
    employeeIDs:[{
        type:ObjectId,
        ref: 'Employees'
    }],
    folderIDs:[{
        type:ObjectId,
        ref:'Folders'
    }],
    date: {type: Date, default: Date.now()}
},{
    timestamps: true
})

const Departments = models.Departments || model("Departments", DepartmentSchema)

export default Departments