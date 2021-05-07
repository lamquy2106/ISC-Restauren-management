import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../controll/input";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import categoryService from "./../services/categoryService";
const DishCategory = (props) => {
  const [categorys, setCategorys] = useState([]);
  const [categorysId, setCategorysId] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Require"),
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
    setCategorysId(dataId);
    if (dataId > 0) {
      categoryService.getById(dataId).then((res) => {
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
    categoryService.remove(dataId).then((res) => {
      // if (res.errorCode === 0) {
      loadData();
      // } else {
      // }
    });
  };

  const handleFormSubmit = (data) => {
    if (categorysId === 0) {
      categoryService.add(data).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    } else {
      categoryService.update(categorysId, data).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    }
  };

  const loadData = () => {
    categoryService.getAll().then((res) => {
      // if(res.errorCode === 0) {
      setCategorys(res.categories);
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
                <h3 className="card-title">Danh mục món ăn</h3>
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
                    <th>Tên Danh mục món ăn</th>
                    <th style={{ width: "80px" }} />
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((category, idx) => {
                    return (
                      <tr key={category.id}>
                        <td>{idx + 1}</td>
                        <td>{category.name}</td>
                        <td>
                          <a
                            href="/#"
                            onClick={(e) => handleModalShow(e, category.id)}
                          >
                            <i className="fas fa-edit text-primary" />
                          </a>
                          <a
                            href="/#"
                            onClick={(e) => deleteRow(e, category.id)}
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
          <Modal.Title>Danh mục món ăn</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Input
              id="txtName"
              type="text"
              label="Tên danh mục món ăn"
              maxLength="100"
              frmField={formik.getFieldProps("name")}
              err={formik.touched.name && formik.errors.name}
              errMessage={formik.errors.name}
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

export default DishCategory;
