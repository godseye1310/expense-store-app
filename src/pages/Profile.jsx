import React, { useState } from "react";
import useAuth from "../store/auth-context";
import axios from "axios";

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
      deleteAttribute: "",
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(UPDATE_PROFLIE_URL, profileData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-3 pt-2">
      <div className="flex justify-between border-b-2 border-b-gray-400 px-1 pb-5">
        <h3 className="text-lg font-medium">
          Winners never quit, Quitters never win
        </h3>
        <div className="flex rounded-lg bg-red-200 px-3 py-1">
          <p>
            Your Profile is <strong>65%</strong> completed. A complete Profile
            has higher chance of landing a job.{" "}
            <span className="text-blue-600">Complete now</span>
          </p>
          <li className="list-none text-blue-600 underline decoration-blue-600"></li>
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={handlePrfofileSubmit} className="">
          <section className="flex gap-16">
            <div className="flex gap-6">
              <label htmlFor="name" className="">
                Full Name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className=""
              />
            </div>
            <div className="flex gap-6">
              <label htmlFor="name" className="">
                Profile Photo URL
              </label>
              <input
                id="name"
                name="name"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
                className=""
              />
            </div>
          </section>

          <div className="pt-10">
            <button className="rounded-sm bg-red-400 px-2 py-1">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
