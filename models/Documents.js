import { Schema, model, models } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const DocumentsSchema = new Schema(
  {
    documentName: { type: String },
    departmentID: { type: ObjectId, ref: "Departments" },
    folderID: { type: ObjectId, ref: "Folders" },
    branchID: {
      type: ObjectId,
      ref: "Branches",
    },
    employeeID: {
      type: ObjectId,
      ref: "Employees",
    },
    date: { type: Date, default: Date() },
  },
  {
    timestamps: true,
  }
);

const Documents = models.Documents || model("Documents", DocumentsSchema);
export default Documents;
