import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../controll/input";
import { useFormik, yupToFormErrors, withFormik } from "formik";
import areaService from "../services/areaService.js";
import * as Yup from "yup";

const Area = (props) => {
  const [areas, setAreas] = useState([]);
  const [areasId, setAreasId] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      areaName: "",
    },
    validationSchema: Yup.object({
      areaName: Yup.string().required("Require"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const handleModalClose = () => {
    setModalShow(false);
  };
  const handleModalShow = (e, dataId) => {
    if (e) e.preventDefault();
    console.log(dataId);
    setAreasId(dataId);
    if (dataId > 0) {
      areaService.getById(dataId).then((res) => {
        console.log(res);
        formik.setValues(res);
        setModalShow(true);
      });
    } else {
      formik.resetForm();
      setModalShow(true);
    }
  };

  const deleteRow = (e, dataId) => {
    e.preventDefault();
    areaService.remove(dataId).then((res) => {
      // if (res.errorCode === 0) {
      loadData();
      // } else {
      // }
    });
  };

  const handleFormSubmit = (data) => {
    if (areasId === 0) {
      areaService.add(data).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    } else {
      areaService.update(areasId, data).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    }
  };

  const loadData = () => {
    areaService.getAll().then((res) => {
      // if(res.errorCode === 0) {
      setAreas(res.areas);
      console.log("àngbágf");
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
                <h3 className="card-title">Khu vực</h3>
              </div>
              <div>
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
                    <th>Tên khu vực</th>
                    <th style={{ width: "80px" }} />
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area, idx) => {
                    return (
                      <tr key={area.areaId}>
                        <td>{idx + 1}</td>
                        <td>{area.areaName}</td>
                        <td>
                          <a
                            href="/#"
                            onClick={(e) => handleModalShow(e, area.areaId)}
                          >
                            <i className="fas fa-edit text-primary" />
                          </a>
                          <a
                            href="/#"
                            onClick={(e) => deleteRow(e, area.areaId)}
                          >
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
          <Modal.Title>Khu vực</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Input
              id="txtArea"
              type="text"
              label="Tên khu vực"
              maxLength="100"
              frmField={formik.getFieldProps("areaName")}
              err={formik.touched.areaName && formik.errors.areaName}
              errMessage={formik.errors.areaName}
            ></Input>
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

export default Area;
