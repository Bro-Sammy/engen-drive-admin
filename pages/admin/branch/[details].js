import React from 'react'
import Header from "../../../components/Head";
import {  signOut, getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import connectMongo from "../../../utils/connectDB";
import Employees from "../../../models/Employees";
import Branches from "../../../models/Branches";
import Departments from "../../../models/Departments";
import Documents from '../../../models/Documents'; 
import Folders from '../../../models/Folders';
import Link from 'next/link';
import { useState } from "react";
import Image from 'next/image'; 
import Layout from '../../../components/Admin/Layout';
import { TrashIcon } from '@heroicons/react/outline';


function Details({folders, session, data,branchData, branches, departments, documents }) {
  

  if (session) {
    return (
        <Layout title={`${branches.branchName}`} data={data} branches={branchData} departments={departments} documents={documents} folders={folders}>
        <div className='bg-slate-100 h-screen'>
        <Header title={`${branches.branchName}`}/>
       
        <div className="w-screen h-screen bg-slate-100 pl-24 pt-[10rem] pr-[20rem]">

            <div className="flex-1 flex w-full gap-4 mt-3 flex-wrap  pb-8">
          {departments.map((department) =>{
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
          
            <hr/>

            {/* documents */}
            <div className="flex flex-row gap-4 overscroll-x-auto mt-5">
              {data.length == 0 ? 
              <div className='items-center flex flex-col justify-center p-4 h-96 w-full'> 
                <img
                  src="/empty.png"
                  alt="empty"
                  className="w-20 h-20 object-cover"
                />
               <strong className="font-light">empty</strong> 
               </div>
               : (
                data.map((user) => {
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
                                {user.departmentID.departmentName}
                              </small>
                            </div>
                          </div>
                        </a>
                      </Link>
                    );
                  }).reverse()
              )}
            </div> 

        </div>
      
      </div> 
      </Layout>
    );
  } else {
    signOut();
  }
}

export default Details


export async function getServerSideProps(context){
  
  try {
    const view = context.params
    const branchId = view.details
    console.log(branchId)

    const { req } = context;
    const session = await getSession({ req }); 
    if (!session) {
      return {
        redirect: { destination: "/" },
      };
    }
    const res = await Employees.find({branchID:branchId}).populate('departmentID');
    const data = await JSON.parse(JSON.stringify(res));

    const branch = await Branches.findOne({_id:branchId});
    const branches = await JSON.parse(JSON.stringify(branch));

    const branchs = await Branches.find({});
    const branchData = await JSON.parse(JSON.stringify(branchs));

    const depart = await Departments.find({branchID:branchId});
    const departments = await JSON.parse(JSON.stringify(depart));

    const results = await Folders.find({});
    const folders = await JSON.parse(JSON.stringify(results));

    const doc = await Documents.find({});
    const documents = await JSON.parse(JSON.stringify(doc));
    console.log(documents,data)

  return{
    props:{
      folders,
      data,
        branches,
        branchData,
        departments,
        documents,
      session,
    }
  }
} catch (error) {
  return {
    notFound: true,
  };
}
}