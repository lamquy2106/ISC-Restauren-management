import React, { useState, Fragment, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

const CustomerOrder = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <input
            placeholder="Tìm kiếm theo tên"
            id="txtSearch"
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="row"></div>
          <div className="row">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr className="table-primary">
                      <th style={{ width: "50px" }}>#</th>
                      <th>Tên món ăn</th>
                      <th>Giá</th>
                      <th style={{ width: "80px" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {/* {majors.map((major, idx) => {
                    return (
                      <tr key={major.id}>
                        <td>{idx + 1}</td>
                        <td>{major.name}</td>
                        <td>
                          <a
                            href="/#"
                            onClick={(e) => handleModalShow(e, major.id)}
                          >
                            <i className="fas fa-edit text-primary" />
                          </a>
                          <a href="/#" onClick={(e) => deleteRow(e, major.id)}>
                            <i className="fas fa-trash-alt text-danger" />
                          </a>
                        </td>
                      </tr>
                    );
                  })} */}
                    <tr>
                      <td>2</td>
                      <td>Marketing</td>
                      <td>Marketing</td>
                      <td>
                        <button className="btn btn-primary">Chọn</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Marketing</td>
                      <td>Marketing</td>
                      <td>
                        <button className="btn btn-primary">Chọn</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 text-center">
          <h4>Bàn ?</h4>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="row">
                <div className="col-lg-8">
                  <p>tên món ăn</p>
                </div>
                <div className="col-lg-4">
                  <p>giá</p>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="row">
                <div className="col-lg-8">
                  <p>tên món ăn</p>
                </div>
                <div className="col-lg-4">
                  <p>giá</p>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <div className="row">
            <div className="col-lg-6">
              <h4>
                <b>Tổng tiền</b>
              </h4>
            </div>
            <div className="col-lg-6">
              <h4>
                <b>số tiền</b>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrder;
