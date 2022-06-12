import { ClockIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ActiveEmployees() {
  return (
    <div>
      <div className="w-full bg-white rounded-xl p-4">
        <div className="flex justify-between mb-2">
          <div className="flex flex-col">
            <strong className="text-xl">Employees</strong>
            <span>Active 75%</span>
          </div>
          <Link href="/">
            <a>
              <p className="text-cyan-700">see all</p>
            </a>
          </Link>
        </div>

        <div className="">
          <div className="flex items-center justify-between rounded-xl p-1 shadow">
            <div className="w-10 h-10">
              <Image
                src={"/kelvin.png"}
                layout="responsive"
                width={100}
                height={100}
                blurDataURL={"/kelvin.png"}
                placeholder="blur"
                alt="kelvin"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <strong>Cornelius Addy</strong>
              <small className="text-slate-600">Operations Manager</small>
            </div>

            <div className="place-items-center flex flex-col">
              <ClockIcon className="stroke-1 w-8" />
              <small className="text-slate-600">9:45am</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveEmployees;
