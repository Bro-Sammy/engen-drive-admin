import connectMongo from "../../utils/connectDB";
import Employees from "../../models/Employees";
import Departments from "../../models/Departments";
import Branches from "../../models/Branches";

export default async function deleteEmployee(req, res) {
  try {
    await connectMongo();
    
     const {employeeID} = req.query;
     const search = await Employees.findOneAndDelete({_id: employeeID}) 
     
       
        const branchSearch = await Branches.findById(search.branchID)
        branchSearch.employeeIDs.pull(results._id)
        branchSearch.save()
        
        const departmentSearch = await Departments.findById(search.departmentID)
        departmentSearch.employeeIDs.pull(results._id)
        departmentSearch.save()
        
        console.log(search, branchSearch, departmentSearch)

     res.json({ results });
    

    
    
  } catch (error) {
    res.json({ error });
  }
}
