import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AdminAxiosInstance from "../../Axios/AdminAxios";
import ProAxiosInstance from "../../Axios/proAxios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionalImage } from "../../Redux/ProState";
// import mapboxgl from 'mapbox-gl';
import axios from "axios";

function Popup({ fun, sendMessage }) {
  const dropdownRef = useRef(null);
  const addressRef = useRef(null);
  const feesRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const locationRef = useRef(null);
  const [details, setdetails] = useState([]);
  const [state, setState] = useState([]);
  const [file, setFile] = useState("");
  const [loader, setloader] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationQuery, setlocationQuery] = useState("");
  const [locationData, setLocationData] = useState("");
  const ProAxios = ProAxiosInstance();
  const AdminAxios = AdminAxiosInstance();
  const email = useSelector((state) => state.Proffessional.email);
  const dispatch = useDispatch();

  // Function to fetch location suggestions from Mapbox
  const fetchLocationSuggestions = async (event) => {
    try {
      const value = event.target.value;
      setlocationQuery(value);
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
        {
          params: {
            access_token:
              "pk.eyJ1IjoiYWptYWxub29yZGhlZW4iLCJhIjoiY2xsZHg3dWd4MGZjbzNkdGo1cG1oNTI2bCJ9._gj7bVbUM6dCwrU9e4MaIA",
          },
        }
      );
      const data = response.data;
      // Extract suggestions from the API response
      setLocationSuggestions(
        data.features.map((feature) => ({
          place_name: feature.place_name,
          latitude: feature.center[1],
          longitude: feature.center[0],
        }))
      );
      // Update location suggestions state
      // setLocationSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  // Function to handle user selection from suggestions
  const handleLocationSuggestionClick = (selectedLocation) => {
    console.log(selectedLocation);
    setlocationQuery(selectedLocation);
    setLocationSuggestions([]);

    const selectedSuggetiob = locationSuggestions.find(
      (suggetion) => suggetion.place_name == selectedLocation
    );
    if (selectedSuggetiob) {
      const { latitude, longitude } = selectedSuggetiob;
      let loc = [];
      loc[0] = longitude;
      loc[1] = latitude;
      setLocationData(loc);
    }
  };

  useEffect(() => {
    AdminAxios.get("/listTypes")
      .then((res) => {
        if (res.status) {
          setdetails(res.data.list);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [file]);

  const showToastMessage = () => {
    toast.done("Success!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 1000,
    });
  };

  const handleCheckboxClick = (itemId) => {
    if (state.includes(itemId)) {
      setState(state.filter((item) => item !== itemId));
      console.log(state);
    } else {
      setState([...state, itemId]);
      console.log(state);
    }
  };

  const updateValue = async () => {
    try {
      const dropdown = dropdownRef.current.value;
      const address = addressRef.current.value;
      const fees = feesRef.current.value;
      const starTime = startTimeRef.current.value;
      const endTime = endTimeRef.current.value;
      const time = starTime + " am -" + " to - "  + endTime + " pm "

      if (
        dropdown == "" ||
        address == "" ||
        fees == "" ||
        locationQuery == "" ||
        starTime == "" ||
        endTime == "" ||
        file == ""
      ) {
        toast("fill all the feilds");
      } else {
        setloader(true);
        const response = await ProAxios.post(
          "/updateProDetails",
          {
            email,
            state,
            dropdown,
            address,
            fees,
            time,
            locationQuery,
            file,
            locationData,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {  
          dispatch(ProfessionalImage({ image: response.data.image }));
          sendMessage('"Start your Journey"');
          showToastMessage("Start your Journey");
          fun("");
        } else if (response.data.data == "ok") {
          fun("");
          setloader(false);
        } else {
          fun("show");
        }
      }
    } catch (error) {
      console.error(error);
      setloader(false);
      fun("show");
    }
  };

  return (
    <div className="min-h-screen flex overflow-scroll items-center justify-center bg-gray-100">
      <div className="w-9/12 max-w-xl p-4 bg-white rounded-md shadow-xl my-10">
        <form className="py-4">
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                file instanceof File
                  ? URL.createObjectURL(file)
                  : "/profileimage.png"
              }
              className="w-24 h-24 rounded-full mb-3 bg-slate-50"
              alt="Profile"
            />
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userType" className="block mb-1">
              Freelancer/Workshop
            </label>
            <select
              id="userType"
              ref={dropdownRef}
              className="h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            >
              <option value="" disabled defaultValue>
                Select one
              </option>
              <option value="freelancer">Freelancer</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>
          <div className="w-full">
            <label>Location</label>
            <input
              required
              ref={locationRef}
              type="text"
              placeholder=""
              value={locationQuery}
              min={1}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
              onChange={fetchLocationSuggestions}
            />
            {/* Location Suggestions */}

            {locationSuggestions.length > 0 && (
              <ul className="bg-white border rounded mt-2 z-10 absolute w-fit">
                {locationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-2 py-1 hover:bg-blue-200 cursor-pointer"
                    onClick={() =>
                      handleLocationSuggestionClick(suggestion.place_name)
                    }
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="w-full">
            <label>Address</label>
            <input
              required
              ref={addressRef}
              type="text"
              placeholder="Add address"
              className="mt-2 h-12 sm:h-16 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            />
          </div>
          <div className="w-full">
            <label>Fees</label>
            <input
              required
              ref={feesRef}
              type="text"
              placeholder=""
              min={1}
              className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div>
              <h1 className="mb-1">Start</h1>
              <input
                required
                ref={startTimeRef}
                type="time"
                className="h-12 w-full sm:w-36 rounded-md bg-gray-100 px-3 outline-none focus:ring"
              />
            </div>
            <div>
              <h1 className="mb-1">End</h1>
              <input
                required
                ref={endTimeRef}
                type="time"
                className="h-12 w-full sm:w-36 rounded-md bg-gray-100 px-3 outline-none focus:ring"
              />
            </div>
          </div>

          <h1 className="w-full">Types</h1>
          <div className="grid grid-cols-2 gap-3 w-full">
            {details.map((items) => {
              return (
                <div key={items._id}>
                  <input
                    key={items._id}
                    required
                    type="checkbox"
                    value={items.name}
                    onClick={() => {
                      handleCheckboxClick(items._id);
                    }}
                  />
                  <label htmlFor="">{items.name}</label>
                </div>
              );
            })}
          </div>

          {loader ? (
            <button
              type="submit"
              className="bg-gradient-to-r w-[8rem] from-blue-700 to-blue-600 mt-3 ml-auto py-1 px-3 rounded text-white"
            >
              <i class="fa-solid fa-circle-notch text-white animate-spin ease-linear"></i>
            </button>
          ) : (
            <button
              onClick={updateValue}
              type="submit"
              className="bg-gradient-to-r w-[8rem] from-blue-700 to-blue-600 mt-3 ml-auto py-1 px-3 rounded text-white"
            >
              Submit
            </button>
          )}
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-600">
              Log in here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Popup;
