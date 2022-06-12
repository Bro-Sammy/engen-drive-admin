import Layout from "../../components/Admin/Layout";
import NewEmployeeForm from "../../components/Admin/NewEmployeeForm";
import Header from "../../components/Head";
import Image from "next/image";
import connectMongo from "../../utils/connectDB";
import Employees from "../../models/Employees";
import Branches from "../../models/Branches";
import Departments from "../../models/Departments";
import { TrashIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Documents from "../../models/Documents";
import Folders from "../../models/Folders";
import { signOut, getSession } from "next-auth/react";

const title = "Employees";

function EmployeesPage({session, data, departData, branchData, folders, documents}) {
   
  const router = useRouter();

  const deleteUser = async (id, e) => {
    e.preventDefault(); 
    // return console.log(id)
    const response = await fetch(`/api/${id}`, {
      method: "POST",
      body: JSON.stringify(`${id}`),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json(); 
    
    return router.push('/admin/employees')
  };

  if(session){
  return (
    <>
    <Layout title={title} data={data} branches={branchData} departments={departData} documents={documents} folders={folders}>
     <div className="w- h-screen bg-slate-200 pl-24 pt-[10rem] pr-[20rem]">
      <Header title={"Employees"} />

      <div className="flex flex-row gap-x-4 w-full h-full">
        <div className="flex-none bg-white h-fit rounded-lg overflow-hidden">
            <h4 className="font-bold bg-indigo-900 w-full p-2 text-white">Add Employee</h4>
          <div className="p-4  shadow">
            <NewEmployeeForm branchData={branchData} departData={departData} />
          </div>
        </div>

        <div className="flex flex-row gap-y-2 ">
          <div className="flex flex-wrap pt-4 px-2 pb-2 bg-slate-200 w-screen gap-3 flex-1 overflow-y-scroll scroll-smooth">
            {data.map((user) => {
              return (
                <Link key={user._id} href={`/admin/employee/${encodeURIComponent(user._id)}`}>
                  <a>
                    <div
                      className="relative flex flex-col h-60 w-60 items-center justify-around rounded-xl overflow-hidden shadow bg-white"
                    > 
                      <button
                        onClick={(e) => deleteUser(user._id, e)}
                        className="absolute top-4 right-4 p-1 bg-red-600 hover:bg-red-800 text-white rounded-full z-10"
                      >
                        <TrashIcon className="w-4" />
                      </button> 
                      <div className="w-full h-10 flex-1 ">
                        <Image
                          src={`${user.avatar}` || "/kelvin.png"} 
                          layout="responsive"
                          width={600}
                          height={450}
                          blurDataURL={`${user.avatar}` || "/kelvin.png"}
                          placeholder="blur"
                          alt="emp"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col p-2  items-center">
                        <strong>{user.firstName + " " + user.lastName}</strong>
                        <small className="text-slate-600">
                          {user.branchID &&
                            user.branchID.branchName +
                              " - " +
                              user.departmentID.departmentName}
                        </small>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            }).reverse()}
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

export default EmployeesPage;


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
    const res = await Employees.find({})
      .populate("branchID")
      .populate("departmentID")
      .exec();
    const data = await JSON.parse(JSON.stringify(res));
    // console.log(data)

    const branch = await Branches.find({});
    const branchData = await JSON.parse(JSON.stringify(branch));

    const depart = await Departments.find({}).populate("branchID").exec();
    const departData = await JSON.parse(JSON.stringify(depart));

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
