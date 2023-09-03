import React, { useEffect, useRef, useState } from "react";
import createAxiosInstance from '../../../Axios/AdminAxios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ListTypes() {
  const typeRef = useRef();
  const editRef = useRef();
  const [type, setType] = useState("");
  const [details, setdetails] = useState([]);
  const [deleted, setdeleted] = useState(0);
  const [edit, setEdit] = useState("");
  const [oldData, setOldData] = useState("");
  const [count, SetCount] = useState(0);
  const [value, SetValue] = useState("");
  let change = false
  const navigate = useNavigate()
  const AdminAxios = createAxiosInstance()
  useEffect(() => {
     AdminAxios.get("/listTypes")
      .then((res) => {
        if (res.status) {
          setdetails(res.data.list);
        }
        if(res.data.token==false){
          toast.error('login for continue')
          navigate('/admin/login')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type, deleted, count]);

  const showToastMessage = () => {
    toast.success("Success!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose:1000
    });
  };
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose:1000
    });
  };

  const addTypes = async (e) => {
    e.preventDefault();
    let typeList = typeRef.current.value.trim();
    if (typeRef.current.value == "" || typeList == "") {
      return showErrorMessage("fill all the Fields");
    }
    try {
      const res = await AdminAxios.post("/listTypes", { typeList });
      if (res.data.status == true) {
        setType(res.data.types);
        showToastMessage();
        typeRef.current.value = ""; // Clear the input field after form submission
      } else {
        showErrorMessage(res.data.message);
        typeRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editType = async (name) => {
    try {
      setOldData(name);
      setEdit(name);
      SetValue(1)
      change=true
    } catch (error) {
      console.log(error);
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    const editedData = editRef.current.value;
    if (editedData == "") {
      return showErrorMessage("Fill the feilds");
    }
    if (editedData == oldData) {
      return showErrorMessage("no changes applied");
    }
    try {
      const res = await  AdminAxios.patch(
        `/editType?editedData=${editedData}&oldData=${oldData}`
      );
      SetValue('')
      if (res.data.status == true) {
        showToastMessage();
        SetCount(count + 1);
        setEdit("");
      } else {
        setEdit("");
        showErrorMessage(res.data.message);
      }
    } catch (error) {}
  };
  const deleteType = async (type) => {
    try {
      const res = await  AdminAxios.delete(`/deleteType?id=${type}`);
      if (res.data.status == true) {
        showToastMessage();
        setdeleted(deleted + res.data.status);
      } else {
        showErrorMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center bg-white h-[39rem]">
        <div className="sm:w-8/12 w-11/12 h-5/6 border-2 flex-col border-slate-400">
          <div className="flex justify-center">
            <h2 htmlFor="" className="mt-2 pb-2 font-bold text-black">
              Add Types
            </h2>
          </div>
          <ToastContainer /> {/* ToastContainer for showing success message */}
          <div className="flex justify-center">
            <form
              className="flex justify-center w-1/2"
              onSubmit={addTypes}
              action=""
            >
              <br />
              <div className="rounded md:w-[80vh] h-11 flex justify-end bg-[#e2e8f0]">
                <input
                  type="text"
                  ref={typeRef}
                  className="h-9 mt-[0.29rem] md:w-[60vh] w-[25vh] sm:w-[50vh] lg:w-[100vh] ml-1 border-none bg-[#e2e8f0]"
                />
                <button className="border bg-[#6D6C6C] text-white font-semibold rounded md:px-6 md:py-1 sm:ms-5">
                  submit
                </button>
              </div>
            </form>
          </div>
          {value?(
          <>
            <div className="flex justify-center">
            <h2 htmlFor="" className="mt-2 pt-2 font-semibold">
              Edit Types
            </h2>
          </div>
          <div className="flex justify-center pt-3">
            <form className="flex justify-center w-1/2" onSubmit={submitEdit} action="">
              <br />
              <div className="rounded md:w-[80vh] h-11 flex justify-end bg-[#e2e8f0]">
                <input
                 ref={editRef}
                  type="text"
                  placeholder="Select the type from below"
                  onChange={(e)=>setEdit(e.target.value)}
                  value={edit}
                  className="font-semibold  font-sans h-9 mt-[0.29rem] md:w-[60vh] w-[25vh] sm:w-[50vh] lg:w-[100vh] ml-1 border-none bg-[#e2e8f0]"
                  name=""
                  id=""
                />
                <button className="border bg-[#6D6C6C] text-white font-semibold rounded md:px-6 md:py-1 sm:ms-5">
                  Submit
                </button>
              </div>
            </form>
          </div>
          </>)
          :''}
         
          <h1 className="text-center p-3 font-bold">List Types</h1>
          <div className="flex justify-center ">
            <div className="rounded md:w-[80vh] overflow-auto h-[10rem] md:h-[17rem] flex pt-2 justify-center bg-[#e2e8f0]">
              <div className="flex-col">
                {details?details.length > 0
                  ? details.map((type, index) => {
                      return (
                        <div key={type._id} className="bg-white flex h-11 w-[60vh]  items-center my-2 rounded-md">
                          <div className="flex gap-3 w-full justify-between ">
                            <div className="flex gap-3 ml-2 font-bold">
                              <div className="text-slate-600">{index + 1}.</div>
                              <div className="text-slate-900">{type.name}</div>
                            </div>
                            <div className="flex gap-4 mr-2">
                              <div>
                                <button
                                  onClick={() => {
                                    editType(type.name);                                    
                                  }}
                                >
                                  <i className="fas fa-edit hover:text-cyan-500 text-black"></i>
                                </button>
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    deleteType(type._id);
                                  }}
                                >
                                  <i className="fa fa-trash hover:text-red-700 text-sky-950"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "empty types":''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListTypes;
