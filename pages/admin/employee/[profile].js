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
import Image from "next/image";
import {
  IdentificationIcon,
  MailIcon,
  OfficeBuildingIcon,
  UploadIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import EditEmployee from "../../../components/Admin/EditEmployee";

function Profile({
  profile,
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
          title={`${profile.firstName + " " + profile.lastName}'s Profile`}
          data={data}
          branches={branches}
          departments={departments}
          documents={documents}
          folders={folders}
        >
          <div className="bg-slate-100 h-screen">
            <Header
              title={`${profile.firstName + " " + profile.lastName}'s Profile`}
            />

            <div className="w-screen h-screen bg-slate-100 pl-20 pt-[5rem] pr-[20rem] flex justify-center items-center">
              <div className="flex flex-row rounded-3xl bg-white overflow-hidden">
                <div className="bg-indigo-900 py-10 px-8 flex-col flex gap-3 text-white items-center justify-center">
                  <div className="w-24 h-24 ring-2 ring-yellow-400 rounded-full overflow-hidden">
                    <Image
                      src={
                        profile.avatar == "" ? "/kelvin.png" : profile.avatar
                      }
                      layout="responsive"
                      width={50}
                      height={50}
                      blurDataURL={
                        profile.avatar == "" ? "/kelvin.png" : profile.avatar
                      }
                      placeholder="blur"
                      alt="kelvin"
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="py-1 flex flex-col gap-1">
                    <div className="break-words text-2xl font-light tracking-wide text-white">
                      {profile.firstName + " " + profile.lastName}
                    </div>

                    <div className="flex gap-1 font-semibold text-sm italic text-slate-200">
                      <MailIcon className="w-4" /> {profile.email}
                    </div>
                    <div className="flex gap-1 font-semibold text-sm italic mb-4 text-slate-200">
                      <IdentificationIcon className="w-4" />{" "}
                      {profile.employeeID}
                    </div>
                    <hr />
                  </div>

                  <div className="bottom-0 text-white stroke-white flex flex-col gap-3 py-4 justify-center items-center w-full">
                    <div className="flex gap-2 font-extralight">
                      <UploadIcon className="w-4" />
                      <span className="font-bold">
                        {profile.documentIDs.length}
                      </span>{" "}
                      File(s) uploaded
                    </div>
                    <div className="flex gap-2 font-extralight">
                      <OfficeBuildingIcon className="w-4" />{" "}
                      <span className="font-bold">
                        {profile.branchID.branchName}
                      </span>{" "}
                      Branch
                    </div>
                    <div className="flex gap-2 font-extralight">
                      <UsersIcon className="w-4" />{" "}
                      <span className="font-bold">
                        {profile.departmentID.departmentName}
                      </span>{" "}
                      Department
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex-none bg-white h-fit">
                    <h4 className="font-bold bg-indigo-900 w-full p-2 text-white">
                      Add Employee
                    </h4>
                    <div className="p-4  shadow">
                      <EditEmployee
                        branchData={branches}
                        departData={departments}
                        profile={profile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else {
    signOut();
  }
}

export default Profile;

export async function getServerSideProps(context) {
  try {
    const view = context.params;
    const employeeId = view.profile;

    const { req } = context;
    const session = await getSession({ req });
    if (!session) {
      return {
        redirect: { destination: "/" },
      };
    }
    const res = await Employees.find({});
    const data = await JSON.parse(JSON.stringify(res));

    const findPerson = await Employees.findOne({ _id: employeeId })
      .populate("branchID")
      .populate("departmentID")
      .exec();
    const profile = await JSON.parse(JSON.stringify(findPerson));

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

    return {
      props: {
        profile,
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
