import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../controll/input";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import ingredientCategoryService from "./../services/ingredientCategoryService";
const IngredientCategory = (props) => {
  const [ingredientCategorys, setIngredientCategorys] = useState([]);
  const [ingredientCategorysId, setIngredientCategorysId] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      ingCateName: "",
    },
    validationSchema: Yup.object({
      ingCateName: Yup.string().required("Vui lòng không để trống !"),
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
    setIngredientCategorysId(dataId);
    if (dataId > 0) {
      ingredientCategoryService.getById(dataId).then((res) => {
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
    ingredientCategoryService.remove(dataId).then((res) => {
      // if (res.errorCode === 0) {
      loadData();
      // } else {
      // }
    });
  };

  const handleFormSubmit = (data) => {
    if (ingredientCategorysId === 0) {
      ingredientCategoryService.add(data).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    } else {
      ingredientCategoryService
        .update(ingredientCategorysId, data)
        .then((res) => {
          // if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          // } else {
          // }
        });
    }
  };

  const loadData = () => {
    ingredientCategoryService.getAll().then((res) => {
      // if(res.errorCode === 0) {
      setIngredientCategorys(res.areas);
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
                <h3 className="card-title">Loại nguyên liệu</h3>
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
                    <th>Tên loại nguyên liệu</th>
                    <th style={{ width: "80px" }} />
                  </tr>
                </thead>
                <tbody>
                  {ingredientCategorys.map((ingredientCategory, idx) => {
                    return (
                      <tr key={ingredientCategory.ingCateId}>
                        <td>{idx + 1}</td>
                        <td>{ingredientCategory.ingCateName}</td>
                        <td>
                          <a
                            href="/#"
                            onClick={(e) =>
                              handleModalShow(e, ingredientCategory.ingCateId)
                            }
                          >
                            <i className="fas fa-edit text-primary" />
                          </a>
                          <a
                            href="/#"
                            onClick={(e) =>
                              deleteRow(e, ingredientCategory.ingCateId)
                            }
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
          <Modal.Title>Loại nguyên liệu</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Input
              id="txtIngCategoryName"
              type="text"
              label="Tên loại nguyên liệu"
              maxLength="100"
              frmField={formik.getFieldProps("ingCateName")}
              err={formik.touched.ingCateName && formik.errors.ingCateName}
              errMessage={formik.errors.ingCateName}
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

export default IngredientCategory;
