
const ContactForm = () => {
  return (
    <div>
      <form action="" method="post">
        <p><input type="name" placeholder="Name"/></p>
        <p><input type="email" placeholder="Email"/></p>
        <p><textarea placeholder="message"></textarea></p>
       
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default ContactForm;