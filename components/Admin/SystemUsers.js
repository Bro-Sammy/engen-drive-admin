import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

function SystemUsers({ employees }) {
  const [users, setUsers] = useState('');

  return (
    <>
      <div className="flex w-full h-20 flex-row overflow-x-scroll scrollbar-none justify-around items-center">
        {employees.map((user) => (
          <div key={user._id} className="w-[3rem] -m-2">
            <Image
              src={`${user.avatar}`}
              layout="responsive"
              width={500}
              height={500}
              blurDataURL={`${user.avatar}`}
              placeholder="blur"
              alt="user"
              className="object-cover rounded-full "
            />
          </div>
        )).reverse()}
      </div>
    </>
  );
}

export default SystemUsers;
