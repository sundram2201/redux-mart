import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
      <div>
        <h1
          style={{
            fontSize: "20rem",
            fontWeight: "bold",
          }}>
          404
        </h1>
        <h6
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
          }}>
          Page not found!
        </h6>
        Time to go{" "}
        <Link to='/' style={{ color: "rgb(122, 62, 246)" }} className='crt-acnt-link'>
          HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
