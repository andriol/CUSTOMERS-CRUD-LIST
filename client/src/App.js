import Form from "./components/input_form/inputForm";
import EditForm from "./components/input_form/editForm";
import uuid from "react-uuid";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const url = "/customer";

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
      //const newCustomer = { ...customer };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(customer),
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

  const selectCustomer = async (id) => {
    const response = await fetch(`http://localhost:8081/customer/${id}`);
    const singleCustomer = await response.json();
    console.log(singleCustomer);
    setCustomer(singleCustomer);
  };
  useEffect(() => {
    selectCustomer();
  }, []);

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
  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8081/customer/${customer.id}`, {
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
                selectCustomer={selectCustomer}
                deleteData={deleteData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
          />
          <Route
            path="/customer/:id"
            render={() => (
              <EditForm
                customer={customer}
                customerList={customerList}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
