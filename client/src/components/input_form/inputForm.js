import React from "react";

function InputForm({ handleChange, handleSubmit, customer, customerList }) {
  console.log(customerList);
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
              <tbody></tbody>
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
              {customerList.map((customer) => {
                const { id, name, address, phone } = customer;
                return (
                  <div className="customer" key={id}>
                    <h1>{name}</h1>
                    <h2>{address}</h2>
                    <h2>{phone}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
