// import React, { setState, Fragment, useEffect } from "react";
// import Input from "../controll/input";
// import "./login.css";
import React, { useState, Fragment } from 'react';
import Input from '../controll/input';
import userService from '../services/userService';
import {connect} from 'react-redux';
import ActionTypes from '../store/action';
// import userService from "./../services/userService";

const Login = (props) => {
  const {onUserLogin} = props;
  const [message , setMessage] = useState("");
  const {history} = props;

  const userNameRef = React.createRef();
  const passwordRef = React.createRef();

  const submitHandler = (e) =>{
      e.preventDefault(); //chặn hành động mặc định của form vì khi submit form sẽ dc refresh
      const username = userNameRef.current.value;
      const password = passwordRef.current.value;
      //calling api
      userService.signIn(username, password).then(res=> {
          //success (mã 200)
          console.log(res.accessToken);
          var data = [];
          data.push({
            "id": res.id,
            "username": res.username,
            "email": res.email,
            "roles": res.roles[0]
          })
          console.log(data[0])
          if(res.errorMessage != null)
          {
              setMessage("Sai mật khẩu");
          } else if(data[0].roles == "ROLE_ADMIN"){
              setMessage("");
              //save user info
              onUserLogin(res.accessToken, data[0]);
              //redirect to home page
              history.push("/home");
              console.log(history)
          } else if(data[0].roles == "ROLE_CASHIER") {
            setMessage("");
            //save user info
            onUserLogin(res.accessToken, data[0]);
            //redirect to home page
            history.push("/menu");
            console.log(history)
          }
      })
          
  }
    return (
      <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-sm-8 col-lg-5">
                        <div className="card bg-primary">
                            <div className="card-header text-white">
                                <h4 className="card-title mb-0"><i className="fas fa-th" /> Login</h4>
                            </div>
                            <div className="card-body bg-white rounded-bottom">
                                <form onSubmit={submitHandler} >
                                    <div className="row">
                                        <div className="col">
                                            <p className="text-danger text-center">{message}</p>
                                        </div>
                                    </div>
                                    <Input inputRef={userNameRef} id="txtUserName" label="UserName" labelSize="5" name="username" type="text" placeHolder="username" />
                                    <Input inputRef={passwordRef} id="txtPassword" label="Password" labelSize="5" name="password" type="password" placeHolder="password"/>
                                    <div className="row">
                                        <div className="offset-sm-3 col-auto">
                                            <button type="submit" className="btn btn-primary">Sign in</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }

   
const mapDispatchToProps = (dispatch) => ({
  onUserLogin: (token, currentUser) => 
      dispatch({
          type: ActionTypes.LOGIN_USER,
          token,
          currentUser,
      }),
});

export default connect(null,mapDispatchToProps)(Login);
