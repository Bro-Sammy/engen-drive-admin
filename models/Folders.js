import { Schema, model, models } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const FolderSchema = new Schema(
  {
    folderName: { type: String },
    departmentID: { type: ObjectId, ref: "Departments" },
    documentIDs: [
      {
        type: ObjectId,
        ref: "Documents",
      },
    ],
    date: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

const Folders = models.Folders || model("Folders", FolderSchema);
export default Folders;
