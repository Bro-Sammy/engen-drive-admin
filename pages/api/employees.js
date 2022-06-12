import connectMongo from "../../utils/connectDB";
import Employees from "../../models/Employees";
import Departments from "../../models/Departments";
import Branches from "../../models/Branches";
import bcrypt from 'bcrypt'

export default async function createEmployee(req, res) {
  try {
    await connectMongo();

    const { firstName,lastName,avatar,email,password,employeeID,branch,department } = req.body.data;
    
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const passwordHash = await bcrypt.hash(password, salt); 

    const search = await Employees.findOne({ employeeID: employeeID });
    if (search) {
      return res.json({
        error: `Employee with ID ${search.employeeID} already exists`,
      });
    } else {
      const user = {
        firstName: firstName,
        lastName:lastName,
        avatar: avatar,
        email: email,
        password: passwordHash,
        employeeID: employeeID,
        branchID: branch,
        departmentID: department
      }
      const results = await Employees.create(user);
      //  Search branch by ID and push Employee
      const branchSearch = await Branches.findById(branch);
      branchSearch.employeeIDs.push(results._id);
      branchSearch.save();
    
      const departmentSearch = await Departments.findById(department);
      departmentSearch.employeeIDs.push(results._id);
      departmentSearch.save();
      
      res.json({ results });
    }
  } catch (error) {
    res.json({ error });
  }
}
