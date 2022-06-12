import { Schema, model, models } from "mongoose";

const ObjectId = Schema.Types.ObjectId

const BranchesSchema = new Schema({
  branchName: { type: String },
  employeeIDs: [{
      type: ObjectId,
      ref: 'Employees'
  }],
  departmentIDs: [{
      type: ObjectId,
      ref: 'Departments'
  }],
  date: {type: Date, default: Date.now()}
},{
    timestamps: true
});

const Branches = models.Branches || model("Branches", BranchesSchema);

export default Branches