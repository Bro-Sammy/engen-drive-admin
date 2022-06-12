import connectMongo from "../../utils/connectDB";
import Branches from "../../models/Branches";

export default async function createEmployee(req, res) {
  try {
    await connectMongo();
    
     const branchName = req.body
     
    const results = await Branches.create(branchName);
    
    res.json({ results });
    
    
  } catch (error) {
    res.json({ error });
  }
}
