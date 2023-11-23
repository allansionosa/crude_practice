import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PatientList } from "./components/PatientList";
import { NewList } from "./components/NewList";
import { PatientDetails } from "./components/PatientDetails";
import { EditDetails } from "./components/EditDetails";

function App() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:3000/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        const mapData = json.map((item) => ({
          key: item.id,
          ...item,
        }));
        setDataList(mapData);
      })
      .catch((e) => {
        console.log("error", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text text-3xl text-center sm:text-center font-bold mt-5 text-blue-600">
        Appointments
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PatientList data={dataList} />} />
            <Route
              path="/new/patient"
              element={<NewList dataList={dataList} dataLists={setDataList} />}
            />
            <Route
              path="/new/patient/details/:ptid"
              element={
                <PatientDetails data={dataList} dataLists={setDataList} />
              }
            />
            <Route
              path="/new/patient/edit/:ptid"
              element={
                <EditDetails dataList={dataList} dataLists={setDataList} />
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
