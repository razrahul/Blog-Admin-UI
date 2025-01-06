import React from "react";
import Contact from "../../components/contact/Contact";

const ContactPage = () => {
  const requests = [
    {
      id: 1,
      name: "Prahlad Nag",
      email: "prahladnag102@gmail.com",
      phone: "+91 09679832940",
      date: "2024-08-12",
      message: "I want an e-commerce website for my new startup",
    },
    {
      id: 2,
      name: "Ranjan Singh",
      email: "prahladnag2022@gmail.com",
      phone: "+91",
      date: "2024-09-13",
      message: "123",
    },
    {
      id: 3,
      name: "S. DIGITAL CAFE",
      email: "prahladnag102@gmail.com",
      phone: "+91",
      date: "2024-09-19",
      message: "",
    },
    {
      id: 4,
      name: "Abhyudya Singh",
      email: "prahladnag102@gmail.com",
      phone: "+91",
      date: "2024-09-19",
      message: "",
    },
  ];

  return (
    <div className="contact-page">
      <h1>Contact Requests</h1>
      <Contact requests={requests} />
    </div>
  );
};

export default ContactPage;
