import Form from "./components/input_form/inputForm";
import EditForm from "./components/input_form/editForm";
import uuid from "react-uuid";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:8081/customer";

function App() {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});

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
        .then((data) => {
          console.log(data);
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

  const deleteData = (id) => {
    fetch(`http://localhost:8081/customer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    })
      .then((response) => {
        response.json();
      })
      .then((data) =>
        // this is the data we get after putting our data, do whatever you want with this data
        console.log(data)
      );
  };
  // const selectCustomer = (id) => {
  //   fetch(`http://localhost:8081/customer/${id}`)
  //     .then((res) => res.json())

  //     .then((data) => console.log(data));
  // };

  const selectCustomer = async (id) => {
    const response = await fetch(`http://localhost:8081/customer/${id}`);
    const customer = await response.json();
    setCustomer(customer);
  };
  useEffect(() => {
    selectCustomer();
  }, []);
  console.log(customer);
  const editData = (id) => {
    //const [name, address, phone] = customer;
    fetch(`http://localhost:8081/customer/${id}`, {
      method: "PUT",
      body: JSON.stringify(customer),

      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        console.log(data);
      })
      //Then with the error generated...
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/customer"
            render={() => (
              <Form
                customerList={customerList}
                customer={customer}
                editData={editData}
                selectCustomer={selectCustomer}
                deleteData={deleteData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
          />
          <EditForm
            path="/customer/:id"
            customer={customer}
            customerList={customerList}
            customer={customer}
            editData={editData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
