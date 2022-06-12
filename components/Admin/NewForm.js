import { PlusIcon, XCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Button from "../Button";
import { useRouter } from "next/router";

function NewForm({ branches, departments, documents }) {
  const router = useRouter()
  const [toggle, setToggle] = useState(false);
  const [branchForm, setBranchForm] = useState(true);
  const [deptForm, setDeptForm] = useState(false);
  const [folderForm, setFolderForm] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [branchID, setBranchID] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [folderName, setFolderName] = useState("");
  const [branchList, setBranchList] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Create new branch
  const createBranch = async (e) => {
    e.preventDefault();
    const data = branchName;

    const response = await fetch("/api/branches", {
      method: "POST",
      body: JSON.stringify({ branchName }),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
    results ? setBranchName("") : setError(results.error);
    return router.push('/admin/branches')
  };

  // create Department
  const createDept = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/departments", {
      method: "POST",
      body: JSON.stringify({ departmentName, branchID }),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();
    console.log(results);
    results
      ? setDepartmentName("") && setBranchID("")
      : setError(results.error);
      return router.push('/admin/branches')
  };

  // Create Folder
  const createFolder = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/folder", {
      method: "POST",
      body: JSON.stringify({ folderName, departmentID }),
      headers: { "Content-Type": "application/json" },
    });
    const results = await response.json();

    results ? setFolderName("") && setBranchID("") : setError(results.error);
    return router.push('/admin/documents')
  };

  return (
    <div className="relative">
      {/* show/hide new form button */}
      <button
        onClick={() => setToggle(!toggle)}
        className={`flex items-center w-15 px-3 py-1 text-slate-50 font-semibold rounded-full ${!toggle? 'btn-primary': 'bg-red-600'}`}
      >
        {!toggle ? (
          <span className="flex items-center gap-x-1">
            <PlusIcon className="w-4 font-bold" /> New
          </span>
        ) : (
          <span className="flex items-center gap-x-1">
            <XCircleIcon className="w-4" /> Close
          </span>
        )}
      </button>

      {/* forms for adding new docs, users, branches, departments */}
      {toggle ? (
        <div className="absolute z-[90rem] w-[40rem] left-[30rem] bg-slate-100 rounded-lg pb-6 shadow-2xl">
          <p className="flex justify-center p-2 bg-orange-500 text-white text-xl">
            Choose an action
          </p>
          <div className="flex mt-2 w-full justify-center gap-x-4">
            <button
              onClick={() => {
                setDeptForm(false), setFolderForm(false), setBranchForm(true);
              }}
              className="btn-primary text-white p-2 px-4 rounded-xl"
            >
              Branch
            </button>
            <button
              onClick={() => {
                setBranchForm(false), setFolderForm(false), setDeptForm(true);
              }}
              className="btn-primary text-white p-2 px-4 rounded-xl"
            >
              Department
            </button>
            <button
              onClick={() => {
                setBranchForm(false), setDeptForm(false), setFolderForm(true);
              }}
              className="btn-primary text-white p-2 px-4 rounded-xl"
            >
              Folder
            </button>
          </div>

          <div className="flex justify-center items-center h-full mt-4">
            {branchForm ? (
              <form
                onSubmit={createBranch}
                className="bg-white w-96 p-6 place-items-center rounded-lg shadow-xl"
              >
                <label>What's the Branch name</label>
                <input
                  type={"text"}
                  placeholder={"Branch Name"}
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="form-input px-4 py-2 w-full rounded-2xl mt-2 placeholder:text-slate-400"
                />
                <Button
                  text={"Create"}
                  styles={
                    "px-1 py-2 w-full font-semibold text-lg mt-1 border-white border-1 hover:bg-blue-900 hover:ring-1 hover:ring-offset-2 ring-blue-800 text-white tracking-wider shadow-sm rounded-2xl"
                  }
                />
                {error ? (
                  <p className="p-1 mt-1 bg-red-600 text-white">{error}</p>
                ) : null}
              </form>
            ) : null}

            {/* Department */}
            {deptForm ? (
              <form
                onSubmit={createDept}
                className="bg-white w-96 p-6 place-items-center rounded-lg  shadow-xl"
              >
                <label>What's the Department name</label>
                <input
                  type={"text"}
                  placeholder={"Department Name"}
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="form-input px-4 py-2 w-full rounded-2xl mt-2 placeholder:text-slate-400"
                />
                <div className=" w-full mt-1">
                  <label className=" text-slate-700">Choose Branch</label>
                  <select
                    className="form-input px-4 py-2 w-full mb-1 rounded-2xl placeholder:text-slate-400"
                    name="departments"
                    value={branchID}
                    onChange={(e) => setBranchID(e.target.value)}
                  >
                    <option value="">select branch</option>
                    {branches.map((list) => {
                      return (
                        <option key={list._id} value={list._id}>
                          {list.branchName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button
                  text={"Create"}
                  styles={
                    "px-1 py-2 w-full font-semibold text-lg mt-1 border-white border-1 hover:bg-blue-900 hover:ring-1 hover:ring-offset-2 ring-blue-800 text-white tracking-wider shadow-sm rounded-2xl"
                  }
                />
                {error && (
                  <p className="p-1 mt-1 bg-red-600 text-white">{error}</p>
                )}
              </form>
            ) : null}

            {/* Folders */}
            {folderForm ? (
              <form
                onSubmit={createFolder}
                className="bg-white w-96 p-6 place-items-center rounded-lg  shadow-xl"
              >
                <label>What's the Folder name</label>
                <input
                  type={"text"}
                  placeholder={"Folder Name"}
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="form-input px-4 py-2 w-full rounded-2xl mt-2 placeholder:text-slate-400"
                />
                <div className=" w-full mt-1">
                  <label className=" text-slate-700">Choose Department</label>
                  <select
                    className="form-input mb-3 px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
                    name="departments"
                    value={departmentID}
                    onChange={(e) => setDepartmentID(e.target.value)}
                  >
                    <option value="">select department</option>
                    {departments.map((list) => {
                      return (
                        <option key={list._id} value={list._id}>
                          {list.departmentName +
                            " - " +
                            list.branchID.branchName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button
                  text={"Create"}
                  styles={
                    "px-1 py-2 w-full font-semibold text-lg mt-1 border-white border-1 hover:bg-blue-900 hover:ring-1 hover:ring-offset-2 ring-blue-800 text-white tracking-wider shadow-sm rounded-2xl"
                  }
                />
                {error && (
                  <p className="p-1 mt-1 bg-red-600 text-white">{error}</p>
                )}
              </form>
            ) : null}
          </div>
        </div>
      ) : (
        !toggle
      )}
    </div>
  );
}

export default NewForm;
