import { useState } from "react";
import LoginForm from "../components/LoginForm";
import Image from "next/image";
import Logo from "../components/Logo";
import Head from "../components/Head";
import { LockClosedIcon } from "@heroicons/react/solid";
import { getCsrfToken, getSession } from "next-auth/react";

// NEXTAUTH_URL=http://localhost:9001/

function Login({ csrfToken }) {
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState(false);
  const [code, setCode] = useState();
  const passCode = 123456 || process.env.NEXT_PUBLIC_PASSCODE;

  const checkPassCode = (event) => {
    event.preventDefault();
    if (passCode === code) {
      return setEnabled(!enabled);
    }
    return setMessage("Code Not Correct");
  };

  return (
    <>
      <Head title={"Admin Login"} />

      <div className="relative w-full h-screen flex flex-row overflow-clip">
        {enabled && (
          <div className="absolute w-screen h-screen bg-indigo-900/70 right-0 top-0 left-0 z-50 flex justify-center items-center">
            <form
              className="relative flex flex-col gap-y-5 bg-white rounded-2xl p-6 shadow-2xl"
              onSubmit={checkPassCode}
            >
              {message && (
                <span className="text-white p-1 rounded bg-red-600">
                  {message}
                </span>
              )}
              <span className="place-content-center">
                <label className="font-bold mb-2 text-red-700">
                  Enter Admin Passcode
                </label>
                <div className="relative w-52 mt-2">
                  <LockClosedIcon className="h-7 absolute right-2 top-2 text-slate-400" />
                  <input
                    type={"password"}
                    placeholder="****************"
                    required
                    onChange={(e) => setCode(e.target.value)}
                    className="form-input px-4 py-2 w-full rounded-2xl placeholder:text-slate-400"
                  />
                </div>
              </span>
              <span className="absolute shadow-lg bg-gradient-to-tr from-white via-slate-300 to-slate-100 -right-4 w-72 h-2 -bottom-5 rounded-full animate-pulse"></span>
            </form>
          </div>
        )}

        <div className="absolute btn-primary lg:block lg:w-16 lg:h-96 lg:left-[62rem] lg:-top-48 w-16 h-40 left-44 -top-20 rounded-full">
          <div className="bg-pink-600 bottom-0 -left-[2.3rem] lg:-left-3/4 absolute lg:text-xl font-bold px-3 py-2 shadow-xl text-slate-50 rounded-full whitespace-nowrap hover:rotate-3 duration-300">
            ENGEN-DRIVE
          </div>
        </div>

        <div className="w-full h-screen p-16 flex flex-col gap-y-7 items-center justify-center">
          <div className="flex w-20  object-cover mb-5">
            <Logo styles={"absolute left-5 rounded-2xl w-20 h-15"} />
          </div>

          <h3 className="font-bold text-blue-900 text-2xl tracking-wider">
            ADMIN LOGIN
          </h3>
          <div>
            <LoginForm crsfToken={csrfToken} />
          </div>

          <div className="hidden md:block lg:block md:w-full lg:w-5/6">
            <Image
              src={"/linkedfiles.png"}
              alt="linked files"
              width={300}
              height={100}
              layout="responsive"
              blurDataURL="/linkedfiles.png"
              placeholder="blur"
              objectFit="contain"
              className="opacity-30"
            />
          </div>
        </div>

        <div className="relative hidden md:hidden lg:block  w-1/3 h-screen overflow-y-clip">
          <div className="z-40 absolute object-cover top-40 -right-48 w-[40rem] h-full">
            <Image
              src={"/engin.png"}
              alt="branch gallery"
              width={500}
              height={500}
              layout="responsive"
              blurDataURL="/engin.png"
              placeholder="blur"
              objectFit="contain"
            />
          </div>
          <div className="z-10 absolute object-cover top-[3rem] blur-lg -right-[22rem] w-[54rem] h-screen">
            <Image
              src={"/engin.png"}
              alt="branch gallery"
              width={500}
              height={500}
              layout="responsive"
              blurDataURL="/engin.png"
              placeholder="blur"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  // console.log("GSSP req", req)
  // console.log("GSSP session", session)
  if (session) {
    return {
      redirect: { destination: "/admin/dashboard" },
    };
  }

  const csrfToken = await getCsrfToken(context);
  console.log("GSSP", csrfToken);

  return {
    props: {
      csrfToken,
    },
  };
}
