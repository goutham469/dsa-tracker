import { useState } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { encrypt } from "./api/encrypt";
import { SERVER_URL } from "./api/secrets";
import { decrypt } from "./api/decrypt";

function App() {


  const [form , setForm] = useState({})
  async function login(e)
  {
    e.preventDefault();
    console.log(form)
    const encrypted = encrypt(form);
    console.log(encrypted);

    console.log(SERVER_URL)

    let response = await fetch(`${SERVER_URL}/login` , {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({data:encrypted})
    });

    console.log(response);
    response = await response.json();

    response = decrypt(response.data);

    console.log(response);
  }

  return (
    <div >
      {/* <RouterProvider router={router} /> */}
      <div>
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
      </div>
    </div>
  );
}

export default App;

