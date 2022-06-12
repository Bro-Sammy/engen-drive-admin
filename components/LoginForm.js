import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/solid";
import Button from "./Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

function LoginForm({ crsfToken }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSpinner(showSpinner);
    let options = { redirect: false, email, password };

    // send the login data to the credential provider signin option in /api/nextauth.js
    const res = await signIn("credentials", options);
    setShowSpinner(!showSpinner);
    if (res?.error) {
      setShowSpinner(showSpinner);
      setMessage(res.error);
      return;
    }
    router.push("/admin/dashboard");
  };

  return (
    <div>
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <input type={"hidden"} name={"csrfToken"} defaultValue={crsfToken} />
        {message && (
          <span className="text-white p-1 rounded bg-red-600 text-center">
            {message}
          </span>
        )}
        <span>
          <label className="text-lg text-slate-700">Your email address </label>
          <div className="relative w-96 mt-2">
            <AtSymbolIcon className="h-7 absolute right-2 top-2 text-slate-400" />
            <input
              type={"email"}
              placeholder={"admin@engenmail.com"}
              required
              onChange={(e) => {
                setEmail(e.target.value), setMessage(null);
              }}
              className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
            />
          </div>
        </span>

        <span>
          <label className="text-lg text-slate-700">Your password</label>
          <div className="relative w-96 mt-2">
            <LockClosedIcon className="h-7 absolute right-2 top-2 text-slate-400" />
            <input
              type={"password"}
              placeholder="****************"
              required
              onChange={(e) => {
                setPassword(e.target.value), setMessage(null);
              }}
              className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
            />
          </div>
        </span>
        <Button
          text={"LOGIN"}
          styles={
            "px-4 py-3 w-96 font-semibold text-lg mt-4 border-white border-1 hover:bg-blue-900 hover:ring-1 hover:ring-offset-2 ring-blue-800 text-white tracking-wider shadow-sm rounded-2xl"
          }
        />
      </form>
    </div>
  );
}

export default LoginForm;
