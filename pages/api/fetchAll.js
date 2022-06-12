import connectMongo from "../../utils/connectDB";
import Branches from "../../models/Branches";

export default async function createEmployee(req, res) {
  try {
    await connectMongo();
     
    const branches = await Branches.find({});
    
    res.json({ branches });
    
    
  } catch (error) {
    res.json({ error });
  }
}
