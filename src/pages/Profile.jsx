import React, { useState } from "react";
import useAuth from "../store/auth-context";
import axios from "axios";
import { VscGlobe } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";

const UPDATE_PROFLIE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAeaA33_FQzcq-GcLm5gDhBeAvjaFxOMY0`;

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const { token } = useAuth();

  const handlePrfofileSubmit = async (event) => {
    event.preventDefault();

    const profileData = {
      idToken: token,
      displayName: displayName,
      photoUrl: photoUrl,
      deleteAttribute: [],
      returnSecureToken: true,
    };

    try {
      // console.log(profileData);

      const response = await axios.post(UPDATE_PROFLIE_URL, profileData);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="h-full w-full pt-2">
      <div className="flex justify-between border-b-2 border-b-gray-400 px-1 pb-5 max-sm:flex-col">
        <h3 className="text-lg font-medium">
          Winners never quit, Quitters never win
        </h3>
        <div className="flex rounded-lg rounded-r-none bg-red-200 px-3 py-2 pr-0">
          <p className="w-96">
            Your Profile is <strong>65%</strong> completed. A complete Profile
            has higher chance of landing a job.{" "}
            <span className="text-blue-600">Complete now</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end px-4 py-8 max-md:justify-center">
        <form
          onSubmit={handlePrfofileSubmit}
          className="relative w-3/4 border-b-2 border-b-gray-400 bg-slate-200 px-2 py-8"
        >
          <h1 className="pb-8 text-2xl">Contact Details</h1>
          <section className="flex w-full justify-evenly gap-x-3 max-md:flex-col max-md:gap-5">
            <div className="flex w-1/2 items-baseline max-md:w-full max-md:justify-between">
              <label
                htmlFor="name"
                className="flex w-1/3 items-start gap-1 text-start"
              >
                <FaGithub className="inline-block text-2xl" />
                Full Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-2/3 rounded border-2 border-gray-300 bg-white px-3 py-1 outline-none focus:border-gray-500"
              />
            </div>
            <div className="flex w-1/2 items-baseline max-md:w-full max-md:justify-between">
              <label
                htmlFor="pfpurl"
                className="flex w-1/3 items-start gap-1 text-start"
              >
                <VscGlobe className="inline-block text-2xl" />
                Profile Photo URL
              </label>
              <input
                id="pfpurl"
                name="pfpurl"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
                className="w-2/3 rounded border-2 border-gray-300 bg-white px-3 py-1 outline-none focus:border-gray-500"
              />
            </div>
          </section>
          <div className="mt-6">
            <button
              type="submit"
              className="rounded-lg bg-red-400 px-2 py-1 text-white hover:bg-red-500"
            >
              Update
            </button>

            <button
              type="button"
              className="absolute right-3 top-3 rounded border-2 border-red-500 bg-white px-2 py-0.5 font-medium text-red-400 hover:bg-rose-100"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

//"Invalid value at 'delete_attribute' (type.googleapis.com/google.cloud.identitytoolkit.v1.SetAccountInfoRequest.UserAttributeName), """
