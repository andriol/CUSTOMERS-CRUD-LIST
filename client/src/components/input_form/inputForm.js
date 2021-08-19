import React from "react";
import "bootswatch/dist/morph/bootstrap.min.css";
import { Link } from "react-router-dom";
//import "./inputForm.scss";

function InputForm({
  handleChange,
  handleSubmit,
  customer,
  customerList,
  deleteData,
  selectCustomer,
}) {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <td>n°</td>
                  <td>Name</td>
                  <td>Address</td>
                  <td>Phone</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer) => {
                  const { id, name, address, phone } = customer;
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{address}</td>
                      <td>{phone}</td>
                      <td>
                        <Link to={`/customer/${customer.id}`}>
                          <button
                            className="btn btn-info"
                            onClick={() => selectCustomer(id)}
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          type="submit"
                          onClick={() => deleteData(id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-5">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    required
                    value={customer.name}
                    onChange={handleChange}
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="form-control"
                    value={customer.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="form-control"
                    value={customer.phone}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  save customer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
