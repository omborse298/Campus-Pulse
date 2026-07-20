import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function Profile() {

  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadProfile();
  }, []);


  const loadProfile = async () => {

    try {

      const currentUser = auth.currentUser;

      if (!currentUser) {
        setLoading(false);
        return;
      }


      const snapshot = await getDoc(
        doc(db, "users", currentUser.uid)
      );


      if (snapshot.exists()) {
        setUser(snapshot.data());
      }


    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



  if(loading){

    return(
      <>
        <Navbar/>
        <Loading/>
        <Footer/>
      </>
    );

  }



  const isFaculty = user?.role === "faculty";


  const displayName = isFaculty
    ? "IT Faculty"
    : user?.name || "Student";


  const displayEmail = isFaculty
    ? "facultyitdepart@gmail.com"
    : user?.email || "Not Available";


  const displayDepartment =
    user?.department || "Information Technology";


  const displayRole = isFaculty
    ? "Faculty"
    : "Student";



  return (

    <>

    <Navbar/>


    <div className="container py-5">


      <div className="row justify-content-center">


        <div className="col-lg-8">


          <div className="card shadow border-0 rounded-4">


            <div className="card-body text-center p-5">



              {/* PROFILE IMAGE */}

              <div 
                className="d-flex justify-content-center align-items-center mb-4"
              >

                <div
                  className="rounded-circle overflow-hidden shadow"
                  style={{
                    width:"150px",
                    height:"150px"
                  }}
                >

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      displayName
                    )}&background=0D6EFD&color=ffffff&size=200&bold=true`}
                    alt="Profile"
                    style={{
                      width:"100%",
                      height:"100%",
                      objectFit:"cover"
                    }}
                  />

                </div>

              </div>




              <h2 className="fw-bold text-capitalize">
                {displayName}
              </h2>



              {!isFaculty && (

                <p className="text-muted mb-4">
                  {displayEmail}
                </p>

              )}



              <hr/>




              <div className="row text-start mt-4">



                <div className="col-md-6 mb-3">

                  <strong>Name</strong>

                  <p className="text-muted">
                    {displayName}
                  </p>

                </div>





                <div className="col-md-6 mb-3">

                  <strong>Email</strong>

                  <p className="text-muted">
                    {displayEmail}
                  </p>

                </div>





                {isFaculty && (

                  <div className="col-md-6 mb-3">

                    <strong>Department</strong>

                    <p className="text-muted">
                      {displayDepartment}
                    </p>

                  </div>

                )}






                <div className="col-md-6 mb-3">

                  <strong>Role</strong>

                  <p className="text-muted">
                    {displayRole}
                  </p>

                </div>







                {!isFaculty && (

                  <>


                  <div className="col-md-6 mb-3">

                    <strong>Class</strong>

                    <p className="text-muted">
                      {user?.studentClass || "Not Available"}
                    </p>

                  </div>





                  <div className="col-md-6 mb-3">

                    <strong>PRN Number</strong>

                    <p className="text-muted">
                      {user?.prn || "Not Available"}
                    </p>

                  </div>


                  </>

                )}





              </div>


            </div>


          </div>


        </div>


      </div>


    </div>



    <Footer/>

    </>

  );

}


export default Profile;