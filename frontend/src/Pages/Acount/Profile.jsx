import "./Account.css";
import { TruckLoader } from "../../components/Loaders";
import { useLayoutContext } from "../../components/Layouts";
import React from "react";

const Profile = () => {
  const { userData } = useLayoutContext();
  const user = userData?.user;

  return (
    <section className="">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          {!user ? (
            <TruckLoader />
          ) : (
            <div className="col-md-12 col-xl-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="mt-3 mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle img-fluid"
                      style={{ width: " 100px" }}
                    />
                  </div>
                  <h4 className="mb-2">{user.fullname.toUpperCase()}</h4>
                  <div className="row my-3">
                    <div className="col-md-6">
                      <p className="text-center fw-bold">Full name </p>
                      <p className="text-center">{user.fullname}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="text-center fw-bold">User name </p>
                      <p className="text-center">{user.username}</p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-12">
                      <p className="text-center fw-bold">Email </p>
                      <p className="text-center">{user.email}</p>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-12">
                      <p className="text-center fw-bold">Contact no. </p>
                      <p className="text-center">{user.contact}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between text-center mt-3 mb-2">
                    <div>
                      <p className="mb-2 h5">{userData.favItemsCount}</p>
                      <p className=" mb-0">Favourite Items</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-2 h5">{userData.itemCount}</p>
                      <p className=" mb-0">Cart Items</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
