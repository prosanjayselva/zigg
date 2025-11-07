import React, { useState, useEffect, useRef } from "react";
import './Liveorder.css';

const Liveorder = () => {

   

    const [form,setform]=useState({
        name:"",
        phone:"",
        remark:""
    })

    const [user,setuser]=useState([]);

    const handledata=(e)=>{
      
      setform({...form,[e.target.name]:e.target.value})
    }
    // const formrest=useRef(null);
    const handlesubmit=(e)=>{
      e.preventDefault();
      setuser([...user,form])
    //   formrest.current.reset();
    //   setform({name:"",phone:"",remark:""})
    }

    useEffect(()=>{
        console.log("User datas",user)
    },[user])

    return (
        <div className="live-container">
            <div className="form-container">
                <form onSubmit={handlesubmit}>
                    <input type="text" value={form.name} name="name"  onChange={handledata} placeholder="name" />
                    <input type="text" value={form.phone} name="phone"  onChange={handledata} placeholder="phone" />
                    <input type="text" value={form.remark} name="remark"  onChange={handledata} placeholder="remark" />
                    <button>Click</button>
                </form>

                {user.map((item,index)=>(
                   <div className="vv" key={index}>
                    <p>{item.name} </p>
                    <p>{item.phone} </p>
                    <p>{item.remark} </p>
                   </div>
                ))}

               

            </div>
        </div>
    )
}

export default Liveorder;