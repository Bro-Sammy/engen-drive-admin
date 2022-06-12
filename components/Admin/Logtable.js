import React from "react";

function Logtable({documents}) {
  return (
    <div>
        
        <div className="flex flex-row mb-3 justify-between items-center">
            <strong className="text-xl">System logs</strong>
           
            <select className="form-input border-gray-300 rounded-xl w-40 p-1" name="Logs">
                <option value="">sort</option>
                <option value={'day'}>day</option>
                <option value={'week'}>week</option>
            </select>
        </div>
        
      <table className="table-auto w-full rounded">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="border border-slate-600">Timestamp</th>
            <th className="border border-slate-600">Employee Name</th>
            <th className="border border-slate-600">Document Name</th>
            <th className="border border-slate-600">Status</th>
          </tr>
        </thead>
        <tbody className="bg-slate-300 text-gray-700">
          {documents.map(docs=>
          <tr key={docs._id} className="shadow w-full">
            <td className="border-r border-slate-600 pl-4">{new Date(`${docs.date}`).toDateString()}</td>
            <td className="border-r border-slate-600 pl-4">{docs.employeeID.firstName} {docs.employeeID.lastName}</td>
            <td className="border-r border-slate-600 pl-4">{docs.documentName}</td>
            <td className="pl-4">uploaded</td>
          </tr>)}
          
        </tbody>
      </table>
    </div>
  );
}

export default Logtable;
