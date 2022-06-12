import Image from "next/image";
import React from "react";

function QLinkItems({ data, branches, departments, documents}) {
  return (
    <div className="flex flex-row items-center gap-7 justify-between mr-2">
      <div className="flex gap-x-1 items-center">
        <div className="w-6 h-6">
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
        <p className="font-bold text-xl text-gray-600">{branches.length}</p>
      </div>

      <div className="flex gap-x-1 items-center">
        <div className="w-6 h-6">
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
        <p className="font-bold text-xl text-gray-600">{departments.length}</p>
      </div>
      
      <div className="flex gap-x-1 items-center"> 
        <div className="w-6 h-6">
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
        <p className="font-bold text-xl text-gray-600">{data.length}</p>
      </div>

      <div className="flex gap-x-1 items-center">
        <div className="w-6 h-6">
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
        <p className="font-bold text-xl text-gray-600">{documents.length}</p>
      </div>
    </div>
  );
}

export default QLinkItems;
