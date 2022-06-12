import Layout from "../../components/Admin/Layout";
import Header from "../../components/Head";
import connectMongo from "../../utils/connectDB";
import Employees from "../../models/Employees";
import Branches from "../../models/Branches";
import Departments from "../../models/Departments";
import { useState } from "react";
import Button from "../../components/Button";
import Folders from "../../models/Folders";
import Documents from "../../models/Documents";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { signOut, getSession } from "next-auth/react";

function BranchesPage({session, data, departData, branchData, folders, documents}) { 
  const [branchForm, setBranchForm] = useState(true);
  const [deptForm, setDeptForm] = useState(false);
  const [folderForm, setFolderForm] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [branchID, setBranchID] = useState("");
  const [folderName, setFolderName] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  // const [branchList, setBranchList] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);


  // Create new branch
  const createBranch = async (e) => {
    e.preventDefault();
    const data = branchName;

    const response = await fetch("/api/branches", {
      method: "POST",
      body: JSON.stringify({ branchName }),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
    results ? setBranchName("") : setError(results.error);
  };

  // create Department
  const createDept = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/departments", {
      method: "POST",
      body: JSON.stringify({ departmentName, branchID }),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
    console.log(results);
    results
      ? setDepartmentName("") && setBranchID("")
      : setError(results.error);
  };

  // Create Folder
  const createFolder = async (e) => {
    e.preventDefault();
    
    const response = await fetch("/api/folder", {
      method: "POST",
      body: JSON.stringify({ folderName, departmentID }),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
  
    results? setFolderName("") && setBranchID("") : setError(results.error);
  };

  const title = "Branches";

  if(session){
  return (
    <>
    <Layout title={title} data={data} branches={branchData} departments={departData} documents={documents} folders={folders}>
    <div className="w-screen h-screen bg-slate-100 pl-24 pt-[10rem] pr-[20rem]">
      <Header title={title} />
      <div className="flex flex-col ">

        <div className="flex-1 flex w-full gap-4 mt-1 mb-3 flex-row">
          {branchData.map((branch, i = 4) =>{
              return (
                <Link key={branch._id} href={`/admin/branch/${encodeURIComponent(branch._id)}`}>
                  <a>
                    <div
                      className="relative flex flex-col h-60 w-60 items-center justify-around rounded-xl overflow-hidden shadow bg-white"
                    > 
                      <button
                        onClick={(e) => deleteUser(branch._id, e)}
                        className="absolute top-4 right-4 p-1 bg-red-600 hover:bg-red-800 text-white rounded-full z-10"
                      >
                        <TrashIcon className="w-4" />
                      </button> 
                      <div className="w-full h-10 flex-1 ">
                        <Image
                          src={ `/gallery${i+=1}.jpeg`} 
                          layout="responsive"
                          width={600}
                          height={450}
                          blurDataURL={ `/gallery${i+=1}.jpeg`}
                          placeholder="blur"
                          alt="branch"
                          className="object-cover"
                        />
                      </div> 

                      <div className="flex flex-col p-2 items-center">
                        <strong>{branch.branchName}</strong>
                        <small className="text-slate-600">
                          Departments: {branch.departmentIDs.length}
                        </small>
                      </div>
                    </div>
                
                  </a>
                </Link>
              )})}
        </div>

        <hr/>

        <div className="flex-1 flex w-full gap-4 mt-3 flex-wrap">
          {departData.map((department, i = 4) =>{
              return (
                <Link key={department._id} href={`/admin/department/${encodeURIComponent(department._id)}`}>
                  <a>
                    <div
                      className="relative group flex flex-row h-fit w-60 p-3 items-center justify-around rounded-xl overflow-hidden shadow bg-white"
                    > 
                      <button
                        onClick={(e) => deleteUser(department._id, e)}
                        className="absolute top-2 right-2 hidden group-hover:block p-1 bg-red-600 hover:bg-red-800 text-white rounded-full z-10"
                      >
                        <TrashIcon className="w-4" />
                      </button> 
                      <div className="w-10 h-10">
                        <Image
                          src={ `/corporate.png`} 
                          layout="responsive"
                          width={512}
                          height={512}
                          blurDataURL={ `/corporate.png`}
                          placeholder="blur"
                          alt="department"
                          className="object-cover"
                        />
                      </div> 

                      <div className="flex flex-col p-  items-center">
                        <strong>{department.departmentName}</strong>
                        <small className="text-slate-600">
                          Employees: {department.employeeIDs.length}
                        </small>
                        <small className="text-slate-600">
                          Folders: {department.folderIDs.length}
                        </small>
                      </div>
                    </div>
                
                  </a>
                </Link>
              )})}
        </div>


      </div>
    </div>
    </Layout>
    </>
  );
} else {
  signOut()
}
}

export default BranchesPage;



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
    // console.log(data);

    const branch = await Branches.find({});
    const branchData = await JSON.parse(JSON.stringify(branch));
    // console.log(branchData);

    const depart = await Departments.find({}).populate('branchID').exec();
    const departData = await JSON.parse(JSON.stringify(depart));
    // console.log(departData);

    const results = await Folders.find({}).populate('departmentID').exec();
    const folders = await JSON.parse(JSON.stringify(results));

    const doc = await Documents.find({}).populate('folderID').populate('departmentID').populate('branchID').populate('employeeID').exec();
    const documents = await JSON.parse(JSON.stringify(doc));

    return {
      props: {
        session,
        data,
        branchData,
        departData,
        folders,
        documents
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
