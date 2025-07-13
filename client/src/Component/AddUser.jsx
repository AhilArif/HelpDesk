import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddUser() {
  const [value, setValue] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const CloseRef = useRef();

  const handleOnchange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adduser = await axios.post('http://10.51.20.77:3000/api/create', value);
      const response = adduser.data;
      if (response.success) {
        toast.success(response.Message);
        CloseRef.current.click();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Add Employee</h4>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-hidden="true"
                  ref={CloseRef}
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
                    onChange={handleOnchange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={value.email}
                    name="email"
                    onChange={handleOnchange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select
                    value={value.department}
                    name="department"
                    onChange={handleOnchange}
                    className="form-control"
                    required
                  > 
                    <option value="">Select Department</option>
                    <option value="HR & Admin">HR & Admin</option>
                    <option value="Corporate Solution">Corporate Solution</option>
                    <option value="Health Solutions">Health Solutions</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing & Partnerships">Marketing & Partnerships</option>
                    <option value="Treaty Reinsurance Solutions">Treaty Reinsurance Solutions</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <select
                    value={value.designation}
                    name="designation"
                    onChange={handleOnchange}
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
                      type={showPassword ? 'text' : 'password'}
                      value={value.password}
                      name="password"
                      onChange={handleOnchange}
                      className="form-control"
                      required
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
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
                <input type="submit" className="btn btn-primary" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
