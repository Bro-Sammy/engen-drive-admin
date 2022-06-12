import React from "react";
import Navigator from "./Navigator";
import RightSidebar from "./RightSidebar";
import TopBar from "./TopBar";


function Layout({ title, children, data, branches, departments, documents, folders }) {
  return (
    <div className="">
      <div className="flex flex-row w-full">
        <TopBar title={title} data={data} branches={branches} departments={departments} documents={documents} folders={folders}/>
        <RightSidebar employees={data} documents={documents} folders={folders}/>
        {children}
        <Navigator /> 
      </div>
    </div>
  );
}

export default Layout;
