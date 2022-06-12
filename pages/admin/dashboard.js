import React from "react";
import ActiveEmployees from "../../components/Admin/ActiveEmployees";
import Charts from "../../components/Admin/Charts";
import Layout from "../../components/Admin/Layout";
import Logtable from "../../components/Admin/Logtable";
import Thumbnails from "../../components/Admin/Thumbnails";
import Head from "../../components/Head";
import connectMongo from "../../utils/connectDB";
import Employees from "../../models/Employees";
import Branches from "../../models/Branches";
import Departments from "../../models/Departments";
import Documents from "../../models/Documents";
import Folders from "../../models/Folders";
import { signOut, getSession } from "next-auth/react";
const title = "Dashboard";

function dashboard({session,branchData, departData, data, documents, folders}) {
  if(session){
  return (
    <>
  <Layout title={title} data={data} branches={branchData} departments={departData} documents={documents} folders={folders}>
    <div className="w-screen h-screen bg-slate-100 pl-24 pt-[10rem] pr-[21rem] overflow-auto">
      {/* Meta Data */}
      <Head title={"Dashboard"} />

      <div className="flex lg:flex-row gap-x-3">
        {/* thumbnails and active employees */}
        <div className="flex flex-col w-80 gap-y-4">
          {/* Thumbnails */}
          <Thumbnails data={data} branches={branchData} departments={departData} documents={documents}/>
          {/* Active Employees */}
          <ActiveEmployees/>
        </div>

        {/* Chart and activity logs */}
        <div className="flex flex-col flex-1 gap-y-3">
           {/* Chart */}
           <div className="bg-white rounded-xl p-5 shadow">
             <Charts employees={data} branches={branchData} departments={departData} documents={documents}/>
           </div>

           {/* Activity logs */}
           <div className="bg-white rounded-xl p-5 shadow">
            <Logtable documents={documents}/>
           </div>
        </div>
      </div>
    </div>
    </Layout>
    </>
  );
}else{
  signOut()
}
}
export default dashboard;



export async function getServerSideProps(context) {
  try {
    await connectMongo();
    const { req } = context;
    const session = await getSession({ req });
    // console.log("GSSP session employee", session)
    if (!session) {
      return {
        redirect: { destination: "/" },
      };
    }
    const res = await Employees.find({});
    const data = await JSON.parse(JSON.stringify(res));

    const branch = await Branches.find({});
    const branchData = await JSON.parse(JSON.stringify(branch));
   
    const depart = await Departments.find({}).populate('branchID').exec();
    const departData = await JSON.parse(JSON.stringify(depart));

    const results = await Folders.find({}).populate('departmentID').exec();
    const folders = await JSON.parse(JSON.stringify(results));
    
    const doc = await Documents.find({}).populate('departmentID').populate('branchID').populate('employeeID').populate('folderID').exec();
    const documents = await JSON.parse(JSON.stringify(doc));
    // console.log(documents)
    

    return {
      props: {
        session,
        data,
        branchData, 
        departData,
        documents,
        folders
      },
    };
  } catch (error) { 
    return {
      notFound: true,
    };
  }
}