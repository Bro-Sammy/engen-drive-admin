import Image from "next/image";
import React from "react";

function Thumbnails({data, branches, departments, documents }) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="w-full flex items-center px-4 justify-between rounded-xl py-3 bg-gradient-to-br from-indigo-600 to-zinc-900">
       <div className="bg-slate-200 p-4 rounded-full">
        <div className="w-10 h-10">
          <Image
            src={"/branch.png"}
            layout="responsive"
            width={100}
            height={100}
            blurDataURL={"/branch.png"}
            placeholder="blur"
            alt="branch"
            className="object-cover"
          />
        </div>
        </div>

        <div className="place-items-end text-slate-50 flex-col flex">
          <strong>BRANCHES</strong>
          <span className="text-3xl font-bold">{branches.length}</span>
        </div>
      </div>

      <div className="w-full flex items-center px-4 justify-between rounded-xl py-3 bg-gradient-to-br from-yellow-600 to-slate-900">
       <div className="bg-slate-200 p-4 rounded-full">
        <div className="w-10 h-10">
        <Image
            src={"/corporate.png"}
            layout="responsive"
            width={100}
            height={100}
            blurDataURL={"/corporate.png"}
            placeholder="blur"
            alt="corporate"
            className="object-cover"
          />
        </div>
        </div>

        <div className="place-items-end text-slate-50 flex-col flex">
          <strong>DEPARTMENTS</strong>
          <span className="text-3xl font-bold">{departments.length}</span>
        </div>
      </div>

      <div className="w-full flex items-center px-4 justify-between rounded-xl py-3 bg-gradient-to-br from-purple-600 to-stone-900">
       <div className="bg-slate-200 p-4 rounded-full">
        <div className="w-10 h-10">
        <Image
            src={"/people.png"}
            layout="responsive"
            width={100}
            height={100}
            blurDataURL={"/people.png"}
            placeholder="blur"
            alt="people"
            className="object-cover"
          />
        </div>
        </div>

        <div className="place-items-end text-slate-50 flex-col flex">
          <strong>EMPLOYEES</strong>
          <span className="text-3xl font-bold">{data.length}</span>
        </div>
      </div>

      <div className="w-full flex items-center px-4 justify-between rounded-xl py-3 bg-gradient-to-br from-sky-600 to-slate-900">
       <div className="bg-slate-200 p-4 rounded-full">
        <div className="w-10 h-10">
        <Image
            src={"/folder.png"}
            layout="responsive"
            width={100}
            height={100}
            blurDataURL={"/folder.png"}
            placeholder="blur"
            alt="folder"
            className="object-cover"
          />
        </div>
        </div>

        <div className="place-items-end text-slate-50 flex-col flex">
          <strong>DOCUMENTS</strong>
          <span className="text-3xl font-bold">{documents.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Thumbnails;
