import Form from "./components/input_form/inputForm";
import uuid from "react-uuid";
import React, { useState, useEffect } from "react";

const url = "http://localhost:8081/customer";

function App() {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [customerList, setCustomerList] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (customer) {
      const singleCustomer = { id: uuid(), ...customer };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(singleCustomer),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((json) => {
          console.log(json);
        })
        //Then with the error generated...
        .catch((error) => {
          console.error("Error:", error);
        });

      setCustomer({ name: "", address: "", phone: "" });
    } else {
      console.log("empty value");
    }
  };
  const getCustomers = async () => {
    const response = await fetch(url);
    const customerList = await response.json();
    setCustomerList(customerList);
  };
  useEffect(() => {
    getCustomers();
  }, []);
  console.log(customerList);
  return (
    <div>
      <Form
        customerList={customerList}
        customer={customer}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
export default App;
