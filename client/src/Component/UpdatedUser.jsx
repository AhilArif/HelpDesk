import React, { useState } from 'react';

export default function UpdatedUser({ handleOnSubmit, value, handlechange }) {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div id="editEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleOnSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Update User</h4>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={value.name}
                    name="name"
                    onChange={handlechange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    value={value.email}
                    name="email"
                    onChange={handlechange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    value={value.department}
                    name="department"
                    onChange={handlechange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="HR & Admin">HR & Admin</option>
                    <option value="Corporate Solution">Corporate Solution</option>
                    <option value="Health Solutions">Health Solutions</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing & Partnerships">
                      Marketing & Partnerships
                    </option>
                    <option value="Treaty Reinsurance Solutions">
                      Treaty Reinsurance Solutions
                    </option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <select
                    value={value.designation}
                    name="designation"
                    onChange={handlechange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Reinsurance Executive">Reinsurance Executive</option>
                    <option value="Head">Head</option>
                    <option value="CEO">CEO</option>
                    <option value="Executive Vice President">Executive Vice President</option>
                    <option value="Janitor">Janitor</option>
                    <option value="Peon">Peon</option>
                    <option value="Admin Support">Admin Support</option>
                    <option value="Executive">Executive</option>
                    <option value="President">President</option>
                    <option value="Account Executive">Account Executive</option>
                    <option value="Deputy Manager">Deputy Manager</option>
                    <option value="Manager">Manager</option>
                    <option value="Front Desk Officer">Front Desk Officer</option>
                    <option value="Chief Accountant">Chief Accountant</option>
                    <option value="Data Entry Officer">Data Entry Officer</option>
                    <option value="Executive Director">Executive Director</option>
                    <option value="Assistant Manager">Assistant Manager</option>
                    <option value="Senior Manager">Senior Manager</option>
                    <option value="Asstiant Senior Manager">Assistant Senior Manager</option>
                    <option value="General Manager">General Manager</option>
                    <option value="Deputy General Manager">Deputy General Manager</option>
                    <option value="Assistant General Manager">Assistant General Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={value.password}
                      name="password"
                      onChange={handlechange}
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-bs-dismiss="modal"
                  value="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Update"
                  data-bs-dismiss="modal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
