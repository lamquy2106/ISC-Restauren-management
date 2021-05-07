import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../controll/input";
import Select from "../controll/select";
import { useFormik, yupToFormError, Field } from "formik";
import deskService from "../services/deskService";
import areaService from "../services/areaService.js";
import "./table.css";
import * as Yup from "yup";

const Table = (props) => {
  const selectStatus = [
    { value: "Empty", label: "Trống" },
    { value: "Booked", label: "Đã đặt trước" },
    { value: "Occupied", label: "Đã có khách" },
  ];
  const [desks, setDesks] = useState([]);
  const [desksId, setDesksId] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [areas, setAreas] = useState([]);
  const [areasId, setAreasId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);

  const formik = useFormik({
    initialValues: {
      numOfSeat: "",
      tableNum: "",
      status: "",
      areaId: 0,
    },
    validationSchema: Yup.object({
      numOfSeat: Yup.string().required("Require"),
      status: Yup.string().required("Require"),
      tableNum: Yup.string().required("Require"),
    }),
    onSubmit: (values) => {
      //console.log(values)
      handleFormSubmit(values);
    },
  });

  const handleModalClose = () => {
    setModalShow(false);
  };
  const handleModalShow = (e, dataId) => {
    if (e) e.preventDefault();
    setDesksId(dataId);
    if (dataId > 0) {
      deskService.getById(dataId).then((res) => {
        var desk = res;
        const result = [];
        //console.log(area[i]);
        result.push({
          id: desk.desks.id,
          numOfSeat: desk.desks.numOfSeat,
          status: desk.desks.status,
          tableNum: desk.desks.tableNum,
          areaId: desk.areaId,
        });
        formik.setValues(result[0]);
        setModalShow(true);
      });
    } else {
      formik.resetForm();
      setModalShow(true);
    }
  };

  const deleteRow = (e, dataId) => {
    e.preventDefault();
    deskService.remove(dataId).then((res) => {
      // if (res.errorCode === 0) {
      loadData();
      // } else {
      // }
    });
  };

  const handleFormSubmit = (data) => {
    const result = [];
    //console.log(area[i]);
    result.push({
      numOfSeat: data.numOfSeat,
      tableNum: data.tableNum,
      status: data.status,
    });
    if (desksId === 0) {
      console.log(result[0]);
      deskService.add(result[0], data.areaId).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    } else {
      console.log(result);
      deskService.update(desksId, result[0], data.areaId).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    }
  };

  const loadData = () => {
    deskService.getAll().then((res) => {
      // if(res.errorCode === 0) {
      setDesks(res.desks);

      //console.log(res.content[0])   ;
      // }
    });
    areaService.getAll().then((res) => {
      var area = res.areas;
      var totalArea = area.length;
      const options = [];
      for (var i = 0; i < totalArea; i++) {
        //console.log(area[i]);
        options.push({ value: area[i].areaId, label: area[i].areaName });
      }
      console.log(options);
      // if(res.errorCode === 0) {
      setAreas(options);

      //console.log(res.content[0])   ;
      // }
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Fragment>
      <div className="container mt-4">
        <div className="card border-primary bt-primary-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">Bàn</h3>
              </div>
              <div>
                <input
                  placeholder="Tìm kiếm theo số bàn"
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
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  onClick={() => handleModalShow(null, 0)}
                >
                  <i className="fas fa-plus" /> Thêm
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr className="table-primary">
                    <th style={{ width: "50px" }}>#</th>
                    <th>Số bàn</th>
                    <th>Số ghế ngồi</th>
                    <th>Trạng thái</th>
                    {/* <th>Khu vực</th> */}

                    <th style={{ width: "80px" }} />
                  </tr>
                </thead>
                <tbody>
                  {desks.map((desk, idx) => {
                    return (
                      <tr key={desk.id}>
                        <td>{idx + 1}</td>
                        <td>{desk.tableNum}</td>
                        <td>{desk.numOfSeat}</td>
                        <td>{desk.status}</td>
                        {/* <td>{desk.areaId}</td> */}
                        <td>
                          <a
                            href="/#"
                            onClick={(e) => handleModalShow(e, desk.id)}
                          >
                            <i className="fas fa-edit text-primary" />
                          </a>
                          <a href="/#" onClick={(e) => deleteRow(e, desk.id)}>
                            <i className="fas fa-trash-alt text-danger ml-2" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Món ăn</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Input
              id="txtTableNum"
              type="number"
              label="Số bàn"
              maxLength="100"
              frmField={formik.getFieldProps("tableNum")}
              err={formik.touched.tableNum && formik.errors.tableNum}
              errMessage={formik.errors.tableNum}
            ></Input>
            <Input
              id="txtNumOfSeats"
              type="number"
              label="Số ghế ngồi"
              maxLength="100"
              frmField={formik.getFieldProps("numOfSeat")}
              err={formik.touched.numOfSeat && formik.errors.numOfSeat}
              errMessage={formik.errors.numOfSeat}
            ></Input>
            <div className="row">
              <div className="col-5">
                <p>Trạng thái</p>
              </div>
              <div className="col-7">
                <Select
                  className="select"
                  onChange={(value) =>
                    formik.setFieldValue("status", value.value)
                  }
                  value={formik.values.value}
                  options={selectStatus}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <p>Khu vực</p>
              </div>
              <div className="col-8">
                <Select
                  className="select"
                  onChange={(value) =>
                    formik.setFieldValue("areaId", value.value)
                  }
                  value={formik.values.areaId}
                  options={areas}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              // disabled={!(formik.dirty && formik.isValid)}
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default Table;
