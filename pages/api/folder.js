import connectMongo from "../../utils/connectDB";
import Departments from "../../models/Departments";
import Folders from "../../models/Folders";

export default async function createEmployee(req, res) {
  try {
    await connectMongo();
    
     const {folderName, departmentID} = req.body
    // return  console.log(folderName, departmentID)
    // check if folder already exists
    const results = await Folders.create({folderName, departmentID});

    const departmentSearch = await Departments.findById(departmentID)
    departmentSearch.folderIDs.push(results._id)
    departmentSearch.save()

    results.departmentID = departmentSearch._id
    results.save()
    
    res.json({ results });
    
    
  } catch (error) {
    res.json({ error });
  }
}
