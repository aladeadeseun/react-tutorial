import { Outlet, useNavigate } from "react-router-dom";
import Contact from "../pages/Contact";

const ContactLayout = () => {
  const navigate = useNavigate()
  return (
    <>
      <Contact>
        <div className="contact-buttons">
          <button onClick={()=>navigate("info")}>Contact Info</button>
          <button onClick={()=>navigate("form")}>Contact Form</button>
        </div>
      </Contact>
      <Outlet/>
    </>
  );
}

export default ContactLayout;