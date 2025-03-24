import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { encrypt } from "./api/encrypt";
import { GOOGLE_AUTH_CLIENT_ID, SERVER_URL } from "./api/secrets";
import { decrypt } from "./api/decrypt";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "./route";
import { ToastContainer } from "react-toastify";

function App() {

  console.log( GOOGLE_AUTH_CLIENT_ID )
  console.log( SERVER_URL )

  return (
    <div >
      <ToastContainer />
      <GoogleOAuthProvider clientId={ GOOGLE_AUTH_CLIENT_ID } >
        <RouterProvider router={ router } /> 
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;


// const [form , setForm] = useState({})
  // async function login(e)
  // {
  //   e.preventDefault();
  //   console.log(form)
  //   const encrypted = encrypt(form);
  //   console.log(encrypted);

  //   console.log(SERVER_URL)

  //   let response = await fetch(`${SERVER_URL}/login` , {
  //     method:"POST",
  //     headers:{ "Content-Type":"application/json" },
  //     body:JSON.stringify({data:encrypted})
  //   });

  //   console.log(response);
  //   response = await response.json();

  //   response = decrypt(response.data);

  //   console.log(response);
  // }

  

{/* <div>
        <input
         type="text"
         placeholder="email"
         className="bg-red-200 m-2 p-2"
         onChange={ (e)=>setForm( data => ({ ...data , email:e.target.value })) }
        />
        <br/>
        <input 
        type="password"
        placeholder="password"
        className="bg-red-200 m-2 p-2"
        onChange={ (e)=>setForm( data => ({ ...data , password:e.target.value })) }
        />
        <br/>
        <button
         onClick={(e)=>login(e)}
         className="bg-red-200 m-2 p-2 cursor-pointer"
        >Login</button>
      </div> */}