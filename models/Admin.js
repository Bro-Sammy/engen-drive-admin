import { Schema, model, models } from "mongoose";
const ObjectId = Schema.Types.ObjectId

const AdminSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: {type:String , default: 'Admin'},
  avatar: { type: String },
  email: { type: String, unique: true},
  password: { type: String },
  employeeID: { type: String },
  branchID: { type: ObjectId, ref:'Branches' },
  documentIDs: [{
    type: ObjectId,
    ref: 'Documents'
  }],
  date: {type: Date, default: Date.now()}
},{
  timestamps: true
}
);

const Admin = models.Admin || model("Admin", AdminSchema);
export default Admin;
