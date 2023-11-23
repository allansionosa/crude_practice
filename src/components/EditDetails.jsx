import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditDetails = () => {
  const { ptid } = useParams();

  const fetchData = () => {
    fetch("http://localhost:3000/posts/" + ptid)
      .then((res) => res.json())
      .then((json) => {
        setId(json.id);
        setName(json.name);
        setEmail(json.email);
        setPhone(json.phone);
        setConcern(json.concern);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // window.location.reload(false);
    // const patientdataId = dataList.reduce(
    //   (max, item) => (Number(item.id) > max ? Number(item.id) : max),
    //   0
    // );
    // const id = patientdataId;
    const patientData = { id, name, email, phone, concern };

    fetch("http://localhost:3000/posts/" + ptid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patientData),
    })
      .then(() => {
        alert("Saved Succesfully.");

        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div>
        <h2 className="flex justify-center text-2xl font-serif pt-5">
          Edit Details
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
