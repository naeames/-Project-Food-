import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Bc2 from "../images/Bc2.jpg";


function Home() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    setEmail(decoded.email);
  }, [email]);


  return (
    
   <div className="homebar" style={{textAlign:"center",color:"white", backgroundImage: "url(" + Bc2 + ")"}}>
          <h1>My profile</h1>
          <h2>Hello {email}</h2>
          </div> 
  );
}
export default Home;
