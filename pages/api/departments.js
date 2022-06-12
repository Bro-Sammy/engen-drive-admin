import connectMongo from "../../utils/connectDB";
import Departments from "../../models/Departments";
import Branches from "../../models/Branches";

export default async function createEmployee(req, res) {
  try {
    await connectMongo();
    
     const {departmentName, branchID} = req.body
    //  console.log(departmentName, branchID)
    const results = await Departments.create({departmentName, branchID});

    const branchSearch = await Branches.findById(branchID)
    branchSearch.departmentIDs.push(results._id)
    branchSearch.save()
    console.log(branchSearch)
    res.json({ results });
    
    
  } catch (error) {
    res.json({ error });
  }
}
