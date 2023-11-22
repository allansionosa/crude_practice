import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const NewList = ({ dataList, dataLists }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const patientdataId = dataList.reduce(
      (max, item) => (Number(item.id) > max ? Number(item.id) : max),
      0
    );
    const id = patientdataId + 1;
    const patientData = { id, name, email, phone, concern };

    dataLists([...dataList, patientData]);

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patientData),
    })
      .then((res) => {
        alert("Saved Succesfully.");

        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div>
        <h2 className="flex justify-center text-2xl font-serif pt-5">
          Add New Patient
        </h2>
        <form
          className="px-5 py-5 max-w-6xl m-auto  gap-5 font-Quicksand grid border-round"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-1 px-3 py-2 md:flex md:items-center md:gap-4">
            <label htmlFor="id" className="min-w-max text-center font-sans">
              ID:
            </label>
            <input
              type="text"
              name="id"
              value={id}
              disabled="disabled"
              className="border-b-2 focus:border-none focus:outline-none focus:ring-2 w-full px-2 py-1 font-medium text-sm"
            ></input>
          </div>
          <div className="grid gap-1 px-3 py-2 md:flex md:items-center md:gap-4">
            <label htmlFor="name" className="min-w-max text-center font-sans">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b-2 focus:border-none focus:outline-none focus:ring-2 w-full px-2 py-1 font-medium text-sm"
            ></input>
          </div>
          <div className="grid gap-1 px-3 py-2 md:flex md:items-center md:gap-4">
            <label htmlFor="email" className="min-w-max text-center font-sans">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 focus:border-none focus:outline-none focus:ring-2 w-full px-2 py-1 font-medium text-sm"
            ></input>
          </div>
          <div className="grid gap-1 px-3 py-2 md:flex md:items-center md:gap-4">
            <label htmlFor="phone" className="min-w-max text-center font-sans">
              Phone:
            </label>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-b-2 focus:border-none focus:outline-none focus:ring-2 w-full px-2 py-1 font-medium text-sm"
            ></input>
          </div>
          <div className="grid gap-1px-3 py-2 md:flex md:items-center md:gap-4">
            <label
              htmlFor="concern"
              className="min-w-max text-center font-sans"
            >
              Appointment Note:
            </label>
            <textarea
              type="note"
              name="concern"
              rows={2}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="border-b-2 focus:border-none focus:outline-none focus:ring-2 w-full px-2 py-1 font-medium text-sm"
              placeholder="detailed comments about condition"
            ></textarea>
          </div>
          <div className="pb-4 px-3">
            <button
              type="submit"
              className="mr-5 justify-start bg-blue-500 py-2 px-6 text-sm font-medium text-white rounded-md cursor-pointer hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="submit"
              className=" justify-end bg-red-500 py-2 px-6 text-sm font-medium text-white rounded-md cursor-pointer"
            >
              <Link to="/">Exit</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
