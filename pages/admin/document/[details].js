import React from "react";
import Header from "../../../components/Head";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Employees from "../../../models/Employees";
import Branches from "../../../models/Branches";
import Departments from "../../../models/Departments";
import Documents from "../../../models/Documents";
import Folders from "../../../models/Folders";
import Layout from "../../../components/Admin/Layout";

function Details({
  file,
  session,
  data,
  branches,
  departments,
  folders,
  documents,
}) {
  const router = useRouter();

  if (session) {
    return (
      <>
        <Layout
          title={"Document Details"}
          data={data}
          branches={branches}
          departments={departments}
          documents={documents}
          folders={folders}
        >
          <div className="bg-slate-100 h-screen">
            <Header title={"Document Details"} />

            <div className="w-screen h-screen bg-slate-100 pl-20 pt-[9rem] pr-[20rem]">
              <iframe
                src={`${file.url}`}
                className="w-full h-full"
                title={`${file.documentName}`}
              ></iframe>
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    signOut();
  }
}

export default Details;

export async function getServerSideProps(context) {
  try {
    const view = context.params;
    const fileId = view.details;

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

    const depart = await Departments.find({}).populate("branchID").exec();
    const departments = await JSON.parse(JSON.stringify(depart));

    const results = await Folders.find({}).populate("departmentID").exec();
    const folders = await JSON.parse(JSON.stringify(results));
    // console.log(folders);

    const doc = await Documents.findOne({})
      .populate("folderID")
      .populate("departmentID")
      .populate("branchID")
      .populate("employeeID")
      .exec();
    const documents = await JSON.parse(JSON.stringify(doc));
    // console.log(documents)
    const docs = await Documents.findOne({ _id: fileId });
    const file = await JSON.parse(JSON.stringify(docs));

    return {
      props: {
        file,
        folders,
        data,
        branches,
        departments,
        documents,
        session,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
