import Image from "next/image";
import Link from "next/link";
import React from "react";
import {  signOut  } from "next-auth/react";

function Navigator() {
  return (
    <>
      <div className="absolute z-50 h-5/6 w-14 rounded-xl place-items-center bg-gradient-to-bl from-blue-800 to-purple-700 px-2 bottom-14 left-5 shadow-xl shadow-black/50">
        <div className="flex flex-col justify-between h-full pt-8 pb-8">
          <ul className="list-none flex flex-col gap-y-10">
            <li className="bg-white rounded-full p-2">
              <Link href="/admin/dashboard">
                <a>
                  <Image
                    src={"/dashboardicon.png"}
                    layout="responsive"
                    width={100}
                    height={100}
                    blurDataURL={"/dashboardicon.png"}
                    placeholder="blur"
                    alt="dashboardicon"
                    className="object-cover"
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/documents">
                <a>
                  <Image
                    src={"/foldernav.png"}
                    layout="responsive"
                    width={100}
                    height={100}
                    blurDataURL={"/foldernav.png"}
                    placeholder="blur"
                    alt="foldernav"
                    className="object-cover"
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/branches">
                <a>
                  <Image
                    src={"/office-building.png"}
                    layout="responsive"
                    width={100}
                    height={100}
                    blurDataURL={"/office-building.png"}
                    placeholder="blur"
                    alt="office-building"
                    className="object-cover"
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/admin/employees">
                <a>
                  <Image
                    src={"/team.png"}
                    layout="responsive"
                    width={100}
                    height={100}
                    blurDataURL={"/team.png"}
                    placeholder="blur"
                    alt="team"
                    className="object-cover"
                  />
                </a>
              </Link>
            </li>
          </ul>

        {/* logout, settings */}
          <ul className="list-none flex flex-col gap-y-10 pt-8">
            <li>
              <Link href="/admin/settings">
                <a>
                  <Image
                    src={"/settings.png"}
                    layout="responsive"
                    width={100}
                    height={100}
                    blurDataURL={"/settings.png"}
                    placeholder="blur"
                    alt="settings"
                    className="object-cover"
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a onClick={(e) => signOut(e)}>
                  <Image
                    src={"/logout.png"}
                    layout="responsive"
                    width={100}
                    height={100}
                    blurDataURL={"/logout.png"}
                    placeholder="blur"
                    alt="logout"
                    className="object-cover"
                  />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navigator;
