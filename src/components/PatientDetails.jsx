import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const PatientDetails = () => {
  const { ptid } = useParams();
  const [dataList, setDataList] = useState({});

  const fetchData = async () => {
    await fetch("http://localhost:3000/posts/" + ptid)
      .then((res) => res.json())
      .then((json) => {
        setDataList(json);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className=" border border-blue-600 px-5 py-5 max-w-2xl m-auto grid gap-5 font-Quicksand mt-5">
        <h1 className=" flex justify-center text-2xl mt-5 font-bold">
          Patient Details
        </h1>

        <h2 className="flex justify-center font-serif">
          Your name is : {dataList.name}
        </h2>
        <h3 className="flex justify-center font-serif">
          Your Contact # is : {dataList.phone}
        </h3>
        <h4 className="flex justify-center font-serif">
          Your Email is : {dataList.email}
        </h4>
        <h5 className="flex justify-center font-serif">
          And your concern is : {dataList.concern}
        </h5>
        <div className="flex justify-center">
          <button className=" bg-blue-500 py-2 px-6 text-sm font-medium text-white rounded-md cursor-pointer hover:bg-blue-600 ">
            <Link to="/">Back to list</Link>
          </button>
        </div>
      </div>
    </>
  );
};
