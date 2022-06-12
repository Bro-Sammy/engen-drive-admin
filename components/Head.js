import Head from "next/head";

function Header({title}) {
  return (
    <div>
        <Head>
        <title>{title} | Engen-Drive</title>
       </Head>
    </div>
  )
}

export default Header