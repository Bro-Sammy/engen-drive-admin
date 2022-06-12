import { Schema, model, models } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const EmployeesSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  avatar: { type: String },
  email: { type: String, unique: true},
  password: { type: String },
  employeeID: { type: String },
  branchID: { type: ObjectId, ref:'Branches' },
  departmentID: { type: ObjectId, ref:'Departments' },
  documentIDs: [{
    type: ObjectId,
    ref: 'Documents'
  }],
  date: {type: Date, default: Date.now()}
},{
  timestamps: true
}
);

const Employees = models.Employees || model("Employees", EmployeesSchema);
export default Employees;
