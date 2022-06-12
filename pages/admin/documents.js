import Image from "next/image";
import Layout from "../../components/Admin/Layout";
import Header from "../../components/Head";
import connectMongo from "../../utils/connectDB";
import Employees from "../../models/Employees";
import Branches from "../../models/Branches";
import Departments from "../../models/Departments";
import Folders from "../../models/Folders";
import Documents from "../../models/Documents";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/outline";
import { signOut, getSession } from "next-auth/react";

const title = "Documents";

function documents({session, data, departData, branchData, folders, documents}) {
  if(session){
  return (
    <>
    <Layout title={title} data={data} branches={branchData} departments={departData} documents={documents} folders={folders}>
      <div className="w-screen h-screen bg-slate-100 pl-24 pt-[10rem] pr-[20rem]">
      <Header title={title} />

      <div className="flex flex-col">
        {/* documents */}
        <strong className="mb-3">Documents</strong>
        <div className="flex flex-row gap-4 overscroll-x-auto pb-8">
          {documents.length ==0?
          <div className="relative w-60 bg-white rounded-xl flex-col gap-x-4 items-center px-3 py-2 shadow">
            <div className="absolute z-20 w-10 h-10 right-4 ring-2 ring-green-500 rounded-full">
              <Image
                src={"/kelvin.png"}
                layout="responsive"
                width={50}
                height={50}
                blurDataURL={"/kelvin.png"}
                placeholder="blur"
                alt="kelvin"
                className="object-cover rounded-full"
              />
            </div>
            <div className="w-full overflow-hidden">
              <Image
                src={"/salesreport.png"}
                layout="responsive"
                width={200}
                height={100}
                blurDataURL={"/salesreport.png"}
                placeholder="blur"
                alt="salesreport"
                className="object-cover"
              />
            </div>
            <div className="flex flex-row items-center gap-x-4">
              <div className="w-4 h-6">
                <Image
                  src={"/pdficon.png"}
                  layout="responsive"
                  width={100}
                  height={150}
                  blurDataURL={"/pdficon.png"}
                  placeholder="blur"
                  alt="pdficon"
                  className="object-cover"
                />
              </div>
              <div className="flex-col flex p-2">
                <strong className="whitespace-nowrap truncate">
                  Sales report
                </strong>
                <small className="whitespace-nowrap">
                  created, today - 20/05
                </small>
              </div>
            </div>
          </div>
          :
          documents.map(docs=>{
            return(
              <Link key={docs._id} href={`/admin/document/${docs._id}`}>
                    <a>
                    <div
                      className="relative w-fit bg-white rounded-xl flex flex-wrap gap-x-4 items-center justify-center px-3 py-2 shadow hover:shadow-md duration-300"
                    > 
                    {<button onClick={(e)=>deleteDoc(docs._id, docs.publicid, e)} className="absolute top-2 right-2 hover:scale-105 hover:bg-red-700 p-1 bg-red-600 text-white rounded-full z-10"><TrashIcon className="w-4"/></button>}
                      <div className="w-20 h-fit">
                        <Image
                          src={"/pdficon.png"}
                          layout="responsive"
                          width={40}
                          height={50}
                          blurDataURL={"/pdficon.png"}
                          placeholder="blur"
                          alt="salesreport"
                          className="object-cover"
                        />
                      </div> 
                         
                        <div className="flex-col flex p-2 mt-2">
                          <strong className="whitespace-nowrap truncate">
                            {docs.documentName}.{docs.file_format}
                          </strong>
                          <small className="whitespace-nowrap">
                           {docs.folderID.folderName} - <b>{docs.branchID.branchName}</b>
                          </small>

                         <small className="font-bold mt-1 text-slate-700"> Created by: {docs.employeeID.firstName + " " + docs.employeeID.lastName }</small>
                         <small className="font-light mt-1"> Date: {new Date(`${docs.date}`).toLocaleString('en', {year:'numeric', month:'short', day:'numeric'})}</small> 
                        </div> 
                    </div>
                    </a>
                    </Link>
            )
          }).reverse()
          }
        </div>

        <hr />

        {/* Folders */}
        <div className="w-full pt-3">
          <strong className="">Folders</strong>
          <div className="flex w-full pt-4 px-2 pb-2 gap-5 h-full scroll-smooth rounded">
          {
            folders.map(folder=>{
            return( <Link  key={folder._id} href={`/admin/folder/${encodeURIComponent(folder._id)}`}>
            <a>
              <div 
              className="rounded-xl flex-row flex items-center gap-3 justify-between w-full shadow hover:shadow-lg duration-100 bg-white mt-1">
              <div className="w-28 h-full bg-indigo-900 p-3 rounded-l-lg shadow-inner">
                <Image
                  src={"/folder_d.png"}
                  layout="responsive"
                  width={200}
                  height={180}
                  blurDataURL={"/folder_d.png"}
                  placeholder="blur"
                  alt="folder_d"
                  className="object-cover"
                  />
              </div>
              <div className="flex flex-col justify-center gap-1 items-center px-2">
                <strong className="w-54 truncate whitespace-nowrap">
                  {folder.folderName}
                </strong>
                <small className="font-light text-gray-500 ">
                  {folder.departmentID.departmentName}
                </small>
                {/* <strong className="text-sm text-gray-500">
                  {branchData.branchName}
                </strong> */}
                <strong className="text-sm text-gray-500">
                  {folder.documentIDs.length} file(s)
                </strong>
              </div>
            </div>
            </a>
            </Link> )
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

export default documents;


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
    // console.log(folders);

    const doc = await Documents.find({}).populate('folderID').populate('departmentID').populate('branchID').populate('employeeID').exec();
    const documents = await JSON.parse(JSON.stringify(doc));
    // console.log(documents)
    

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