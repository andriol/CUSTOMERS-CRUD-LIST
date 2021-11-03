import React from "react";

function editForm({ handleChange, customer, onSubmit }) {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5 offset-md-3 card">
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    value={customer.name}
                    onChange={handleChange}
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    value={customer.address}
                    placeholder="Address"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    value={customer.phone}
                    placeholder="Phone"
                    className="form-control"
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

export default editForm;
