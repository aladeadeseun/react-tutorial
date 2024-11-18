import React from "react";

type ContactProps = {
  children?:React.ReactNode
}
const Contact = ({children}:ContactProps) => {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <h2>Contact Page</h2>
      {
        children
      }
    </div>
  );
}
export default Contact