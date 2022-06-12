import Image from "next/image";
import React from "react";

function Logo({styles}) {
  return (
    <div>
      <Image
        src="/Engen_Logo.jpeg"
        width={"100%"}
        height={"100%"}
        objectFit="cover"
        blurDataURL="/Engen_Logo.jpeg"
        className={`${styles}`}
      />
    </div>
  );
}

export default Logo;
