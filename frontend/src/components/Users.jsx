import React, { useState } from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const []=useState();
  const {users}=useSelector((state)=>state.user);
  const formatDate=(timestamp)=>{
    const date=new Date(timestamp);
    const formatedDate=`${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getFullYear())}`;
    const formatedTime=`${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}`;
    const result=`${formatedDate} ${formatedTime}`;
    return result;  
  }
  return <>
  
  </>;
};

export default Users;
