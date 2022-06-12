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


function Details({folders, folder, session, data, branches, departments, documents }) {
  

  if (session) {
    return (
        <Layout title={'Folder Details'} data={data} branches={branches} departments={departments} documents={documents} folders={folders}>
        <div className='bg-slate-100 h-screen'>
        <Header title={'Folder Details'}/>
       
        <div className="w-screen h-screen bg-slate-100 pl-24 pt-[10rem] pr-[20rem]">
           
            {/* documents */}
            <div className="flex flex-row gap-4 overscroll-x-auto mt-5 pb-8">
              {documents.length == 0 ? 
              <div className='items-center flex flex-col justify-center p-4 h-96 w-full'> 
                <img
                  src="/empty.png"
                  alt="empty"
                  className="w-20 h-20 object-cover"
                />
               <strong className="font-light">empty</strong> 
               </div>
               : (
                documents.map((docs) => {
                   
                  return (
                    <Link key={docs._id} href={`/admin/document/${docs._id}`}>
                    <a>
                    <div
                      className="w-fit bg-white rounded-xl flex gap-x-4 items-center justify-center px-3 py-2 shadow hover:scale-105 duration-300"
                    > 
                      <div className="w-20 h-fit">
                        <Image
                          src={"/pdf.png"}
                          layout="responsive"
                          width={40}
                          height={50}
                          blurDataURL={"/pdf.png"}
                          placeholder="blur"
                          alt="salesreport"
                          className="object-cover"
                        />
                      </div> 
                         
                        <div className="flex-col flex p-2">
                          <strong className="whitespace-nowrap truncate">
                            {docs.documentName}.{docs.file_format}
                          </strong>
                          <small className="whitespace-nowrap">
                           {docs.folderID.folderName}
                          </small>
                        </div> 
                    </div>
                    </a>
                    </Link>
                  );
                   
                })
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
    const folderId = view.details
    console.log(folderId)

    const { req } = context;
    const session = await getSession({ req }); 
    if (!session) {
      return {
        redirect: { destination: "/" },
      };
    }
    const res = await Employees.find({});
    const data = await JSON.parse(JSON.stringify(res));

    const branch = await Branches.find({});
    const branches = await JSON.parse(JSON.stringify(branch));

    const depart = await Departments.find({}).populate('branchID').exec();
    const departments = await JSON.parse(JSON.stringify(depart));

    const results = await Folders.find({}).populate('departmentID').exec();
    const folders = await JSON.parse(JSON.stringify(results));

    const foundFolder = await Folders.findOne({_id: folderId })
    .populate('documentIDs').populate('departmentID')
    .exec();
    const folder = await JSON.parse(JSON.stringify(foundFolder));
    // console.log(folder);

    const doc = await Documents.find({ folderID: folder._id }).populate('folderID').populate('departmentID').populate('branchID').populate('employeeID').exec();
    const documents = await JSON.parse(JSON.stringify(doc));
    console.log(documents)

  return{
    props:{
      folder,
      folders,
      data,
        branches,
        departments,
        documents,
      session,
    }
  }
} catch (error) {
  console.log(error);
  return {
    notFound: true,
  };
}
}