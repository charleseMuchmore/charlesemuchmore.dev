

const ContactForm = () => {
    return (
      <div className="container">
        <h1>Contact Me</h1>
        <form
          action="mailto:your.charlymuchmore@gmail.com"
          method="post"
          encType="text/plain"
        >
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    required
                />
            </div>
  
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="form-control"
                    required
                />
            </div>
  
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Your Message"
                    className="form-control"
                    required
                ></textarea>
            </div>
  
          <button type="submit" className="btn bg-blue txt-light">Send Message</button>
        </form>
      </div>
    );
  };
  
  export default ContactForm;