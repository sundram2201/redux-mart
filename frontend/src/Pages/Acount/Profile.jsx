import { useSelector } from "react-redux";
import "./Account.css";
import { TruckLoader } from "../../components/Loaders";

const Profile = () => {
  const profile = useSelector((state) => state.userData.data);

  const userData = profile?.user;
  return (
    <section className='vh-100'>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          {!userData ? (
            <TruckLoader />
          ) : (
            <div className='col-md-12 col-xl-4'>
              <div className='card'>
                <div className='card-body text-center'>
                  <div className='mt-3 mb-4'>
                    <img
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
                      className='rounded-circle img-fluid'
                      style={{ width: " 100px" }}
                    />
                  </div>
                  <h4 className='mb-2'>{userData.fullname}</h4>
                  <div className='row my-3  '>
                    <div className='col-md-6'>
                      <p className=' text-start fw-bold'>Full name </p>
                      <p className=' text-start'>{userData.fullname}</p>
                    </div>
                    <div className='col-md-6'>
                      <p className=' text-start fw-bold'>User name </p>
                      <p className=' text-start'>{userData.username}</p>
                    </div>
                  </div>
                  <div className='row my-3  '>
                    <div className='col-md-12'>
                      <p className=' text-start fw-bold'>Email </p>
                      <p className=' text-start'>{userData.email}</p>
                    </div>
                  </div>
                  <div className='row my-3  '>
                    <div className='col-md-12'>
                      <p className=' text-start fw-bold'>Contact no. </p>
                      <p className=' text-start'>{userData.contact}</p>
                    </div>
                  </div>

                  <div className='d-flex justify-content-between text-center mt-5 mb-2'>
                    <div>
                      <p className='mb-2 h5'>24</p>
                      <p className=' mb-0'>Favourite Items</p>
                    </div>
                    <div className='px-3'>
                      <p className='mb-2 h5'>{profile.itemCount}</p>
                      <p className=' mb-0'>Cart Items</p>
                    </div>
                    {/* <div>
                      <p className='mb-2 h5'>16</p>
                      <p className=' mb-0'>Proucts added</p>
                    </div> */}
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
