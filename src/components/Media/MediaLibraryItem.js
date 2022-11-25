import React from "react";
import { HOST_NAME } from "utils/constant";

export default function AnotherMediaItem({ file, selectedItem, ...props }) {
  const { url, alt } = file;

  return (
    <div className=" relative has-tooltip" key={props.key}>
      <div
        onClick={() => props.openEdit(file)}
        className={
          file === selectedItem
            ? " w-full h-36  hover:ring-2 cursor-pointer group relative border-4 outline-none rounded border-blue-700 transform scale-105 duration-50 "
            : " w-full h-36 hover:ring-2 cursor-pointer group relative "
        }
      >
        <span className="tooltip rounded-br shadow-lg p-1 bg-gray-100 ">
          Chọn để xem
        </span>
        <img
          data-src={`${HOST_NAME}${url}`}
          src="/img/img_placeholder.jpg"
          alt={alt}
          className=" w-full h-full object-cover relative lazyload"
        ></img>
        <div className="hover:opacity-50 transition duration-150 opacity-0  bg-black absolute w-full h-full top-0 left-0"></div>
      </div>
    </div>

  );
}
