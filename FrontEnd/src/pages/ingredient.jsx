import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../controll/input";
import Select from "../controll/select";
import { useFormik, yupToFormError, Field } from "formik";
import "./table.css";
import * as Yup from "yup";
import ingredientService from "./../services/ingredientService";
import ingredientCategoryService from "./../services/ingredientCategoryService";
const Ingredient = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsId, setIngredientsId] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [ingredientCategorys, setIngredientCategorys] = useState([]);
  const [ingredientCategorysId, setIngredientCategorysId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);

  const formik = useFormik({
    initialValues: {
      ingName: "",
      ingPrice: "",
      quantity: "",
      unit: "",
    },
    validationSchema: Yup.object({
      ingName: Yup.string().required("Require"),
      ingPrice: Yup.string().required("Require"),
      quantity: Yup.string().required("Require"),
      unit: Yup.string().required("Require"),
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
    setIngredientsId(dataId);
    if (dataId > 0) {
      ingredientService.getById(dataId).then((res) => {
        var ingredient = res;
        const result = [];

        result.push({
          id: ingredient.ingredients.id,
          ingName: ingredient.ingredients.ingName,
          ingPrice: ingredient.ingredients.ingPrice,
          quantity: ingredient.ingredients.quantity,
          unit: ingredient.ingredients.unit,
          ingCateId: ingredient.ingCateId,
        });
        console.log(result[0]);
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
    ingredientService.remove(dataId).then((res) => {
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
      ingName: data.ingName,
      ingPrice: data.ingPrice,
      quantity: data.quantity,
      unit: data.unit,
    });
    if (ingredientsId === 0) {
      console.log(data);
      ingredientService.add(result[0], data.ingCateId).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    } else {
      console.log(result);
      ingredientService
        .update(ingredientsId, result[0], data.ingCateId)
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
    ingredientService.getAll().then((res) => {
      // if(res.errorCode === 0) {
      setIngredients(res.ingredients);

      //console.log(res.content[0])   ;
      // }
    });
    ingredientCategoryService.getAll().then((res) => {
      var ingCate = res.areas;
      var totalIngCate = ingCate.length;
      const options = [];
      for (var i = 0; i < totalIngCate; i++) {
        //console.log(area[i]);
        options.push({
          value: ingCate[i].ingCateId,
          label: ingCate[i].ingCateName,
        });
      }
      console.log(options);
      // if(res.errorCode === 0) {
      setIngredientCategorys(options);

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
                <h3 className="card-title">Nguyên liệu</h3>
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
                    <th>Tên nguyên liệu</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Đơn vị tính</th>
                    <th style={{ width: "80px" }} />
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ingredient, idx) => {
                    return (
                      <tr key={ingredient.ingId}>
                        <td>{idx + 1}</td>
                        <td>{ingredient.ingName}</td>
                        <td>{ingredient.ingPrice}</td>
                        <td>{ingredient.quantity}</td>
                        <td>{ingredient.unit}</td>

                        <td>
                          <a
                            href="/#"
                            onClick={(e) =>
                              handleModalShow(e, ingredient.ingId)
                            }
                          >
                            <i className="fas fa-edit text-primary" />
                          </a>
                          <a
                            href="/#"
                            onClick={(e) => deleteRow(e, ingredient.ingId)}
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
          <Modal.Title>Nguyên liệu</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Input
              id="txtIngName"
              type="text"
              label="Tên nguyên liệu"
              maxLength="100"
              frmField={formik.getFieldProps("ingName")}
              err={formik.touched.ingName && formik.errors.ingName}
              errMessage={formik.errors.ingName}
            ></Input>
            <Input
              id="txtIngPrice"
              type="number"
              label="Giá"
              maxLength="100"
              frmField={formik.getFieldProps("ingPrice")}
              err={formik.touched.ingPrice && formik.errors.ingPrice}
              errMessage={formik.errors.ingPrice}
            ></Input>
            <Input
              id="txtQuantity"
              type="number"
              label="Số lượng"
              maxLength="100"
              frmField={formik.getFieldProps("quantity")}
              err={formik.touched.quantity && formik.errors.quantity}
              errMessage={formik.errors.quantity}
            ></Input>
            <Input
              id="txtUnit"
              type="text"
              label="Đơn vị tính"
              maxLength="100"
              frmField={formik.getFieldProps("unit")}
              err={formik.touched.unit && formik.errors.unit}
              errMessage={formik.errors.unit}
            ></Input>
            <div className="row">
              <div className="col-5">
                <p>Danh mục nguyên liệu</p>
              </div>
              <div className="col-7">
                <Select
                  className="select"
                  onChange={(value) =>
                    formik.setFieldValue("ingCateId", value.value)
                  }
                  value={formik.values.ingCateId}
                  options={ingredientCategorys}
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

export default Ingredient;
