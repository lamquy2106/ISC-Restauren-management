import React, { useState, Fragment, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../controll/input";
import Select from "../controll/select";
import { useFormik, yupToFormError, Field } from "formik";
import * as Yup from "yup";
import dishService from "./../services/dishService";
import categoryService from "./../services/categorService";
import ingredientService from "../services/ingredientService"
import recipeService from "./../services/recipeService";
const Dish = (props) => {
  const selectStatus = [
    { value: "Active", label: "Đang bán" },
    { value: "NonActive", label: "Ngưng bán" },
  ];
  const [dishs, setDishs] = useState([]);

  const [dishsId, setDishsId] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [categorysId, setCategorysId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [recipesId, setRecipesId] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [modalRecipeShow, setModalRecipeShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      dishName: "",
      dishPrice: "",
      onSale: "",
      status: "",
      imagePath: "",
      cateId: 0,
    },
    validationSchema: Yup.object({
      dishName: Yup.string().required("Require"),
      status: Yup.string().required("Require"),
      dishPrice: Yup.string().required("Require"),
      onSale: Yup.string().required("Require"),
      imagePath: Yup.string().required("Require"),
      // dishCategory: Yup.string().required("Require"),
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
    setDishsId(dataId);
    if (dataId > 0) {
      dishService.getById(dataId).then((res) => {
        var dish = res;
        const result = [];
        console.log(dish.cateId);
        result.push({
          id: dish.dishs.id,
          dishName: dish.dishs.dishName,
          dishPrice: dish.dishs.dishPrice,
          onSale: dish.dishs.onSale,
          status: dish.dishs.status,
          imagePath: dish.dishs.imagePath,
          cateId: dish.cateId,
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
    dishService.remove(dataId).then((res) => {
      // if (res.errorCode === 0) {
      loadData();
      // } else {
      // }
    });
  };

  const handleFormSubmit = (data) => {
    const result = [];

    result.push({
      dishName: data.dishName,
      dishPrice: data.dishPrice,
      onSale: data.onSale,
      status: data.status,
      imagePath: data.imagePath,
    });
    console.log("jhsdgfg");
    if (dishsId === 0) {
      console.log(result[0]);
      dishService.add(result[0], data.cateId).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    } else {
      console.log(result);
      dishService.update(dishsId, result[0], data.cateId).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalClose();
        // } else {
        // }
      });
    }
  };


  const loadData = () => {
    dishService.getAll().then((res) => {
      // if(res.errorCode === 0) {
      setDishs(res.dishs);

      //console.log(res.content[0])   ;
      // }
    });
    categoryService.getAll().then((res) => {
      var category = res.categories;
      var totalCate = category.length;
      const options = [];
      for (var i = 0; i < totalCate; i++) {
        //console.log(area[i]);
        options.push({ value: category[i].id, label: category[i].name });
      }
      console.log(options);
      // if(res.errorCode === 0) {
      setCategorys(options);

      //console.log(res.content[0])   ;
      // }
    });

    ingredientService.getAll().then((res) => {
      var ingredient = res.ingredients;
      var total = ingredient.length;
      const options = [];
      for(var i = 0; i<total; i++) {
        options.push({value: ingredient[i].ingId, label: ingredient[i].ingName});
      }
      setIngredients(options);
    })
  };

  useEffect(() => {
    loadData();
  }, []);

  //hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh

  

  const formikRecipe = useFormik({
    initialValues: {
      quantity: "",
    },
    validationSchema: Yup.object({
      quantity: Yup.string().required("Require"),
    }),
    onSubmit: (values) => {
      handleFormRecipeSubmit(values);
    },
  });

  const handleModalRecipeClose = () => {
    setModalRecipeShow(false);
  };
  const handleModalRecipeShow = (e, dataId) => {
    if (e) e.preventDefault();
    
    // if (dataId > 0) {
    //   recipeService.getById(dataId).then((res) => {
    //     var recipe = res;
    //     const result = [];
    //     result.push({
    //       recipeId: recipe.recipe.recipeId,
    //       quantity: recipe.recipe.quantity,
    //     });
    //     formik.setValues(result[0]);
    // setModalRecipeShow(true);
    //   });
    // } else {
    //   formik.resetForm();
    //   setModalRecipeShow(true);
    // }
    setDishsId(dataId);
    setModalRecipeShow(true);
  };

  // const deleteRecipeRow = (e, dataId) => {
  //   e.preventDefault();
  //   recipeService.remove(dataId).then((res) => {
  //     // if (res.errorCode === 0) {
  //     loadData();
  //     // } else {
  //     // }
  //   });
  // };

  const handleFormRecipeSubmit = (data) => {
    console.log(data)
    const result = [];

    result.push({
      quantity: data.quantity,
    });
    console.log("jhsdgfg");
    if (recipesId === 0) {
      console.log(result[0]);
      recipeService.add(result[0], dishsId, data.ingId).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalRecipeClose();
        // } else {
        // }
      });
    } else {
      console.log(result);
      dishService.update(dishsId, result[0], data.cateId).then((res) => {
        // if (res.errorCode === 0) {
        loadData();
        handleModalRecipeClose();
        // } else {
        // }
      });
    }
  };

  // const loadData = () => {
  //   dishService.getAll().then((res) => {
  //     // if(res.errorCode === 0) {
  //     setDishs(res.dishs);

  //     //console.log(res.content[0])   ;
  //     // }
  //   });
  //   categoryService.getAll().then((res) => {
  //     var category = res.categories;
  //     var totalCate = category.length;
  //     const options = [];
  //     for (var i = 0; i < totalCate; i++) {
  //       //console.log(area[i]);
  //       options.push({ value: category[i].id, label: category[i].name });
  //     }
  //     console.log(options);
  //     // if(res.errorCode === 0) {
  //     setCategorys(options);

  //     //console.log(res.content[0])   ;
  //     // }
  //   });
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="card border-primary bt-primary-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">Món ăn</h3>
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
                    <th>Tên món ăn</th>
                    <th>Giá</th>
                    <th>Khuyến mãi</th>
                    <th>Trạng thái</th>
                    <th>Ảnh</th>
                    <th>Công thức</th>
                    <th style={{ width: "80px" }} />
                  </tr>
                </thead>
                <tbody>
                  {dishs.map((dish, idx) => {
                    return (
                      <tr key={dish.dishId}>
                        <td>{idx + 1}</td>
                        <td>{dish.dishName}</td>
                        <td>{dish.dishPrice}</td>
                        <td>{dish.onSale}</td>
                        <td>{dish.status}</td>
                        <td>{dish.imagePath}</td>
                        <td className="text-center">
                          <a
                            className="btn btn-primary"
                            href="/#"
                            onClick={(e) =>
                              handleModalRecipeShow(e, dish.dishId)
                            }
                          >
                            Thêm
                          </a>
                        </td>

                        <td>
                          <a
                            href="/#"
                            onClick={(e) => handleModalShow(e, dish.dishId)}
                          >
                            <i className="fas fa-edit text-primary" />
                          </a>
                          <a
                            href="/#"
                            onClick={(e) => deleteRow(e, dish.dishId)}
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
          <Modal.Title>Món ăn</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Input
              id="txtDishName"
              type="text"
              label="Tên món ăn"
              maxLength="100"
              frmField={formik.getFieldProps("dishName")}
              err={formik.touched.dishName && formik.errors.dishName}
              errMessage={formik.errors.dishName}
            ></Input>
            <Input
              id="txtDishPrice"
              type="number"
              label="Giá"
              maxLength="100"
              frmField={formik.getFieldProps("dishPrice")}
              err={formik.touched.dishPrice && formik.errors.dishPrice}
              errMessage={formik.errors.dishPrice}
            ></Input>
            <Input
              id="txtonSale"
              type="number"
              label="Khuyến mãi"
              maxLength="100"
              frmField={formik.getFieldProps("onSale")}
              err={formik.touched.onSale && formik.errors.onSale}
              errMessage={formik.errors.onSale}
            ></Input>
            {/* <Input
              id="txtStatus"
              type="text"
              label="Trạng thái"
              maxLength="100"
              frmField={formik.getFieldProps("status")}
              err={formik.touched.status && formik.errors.status}
              errMessage={formik.errors.status}
            ></Input> */}
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
            <Input
              type="text"
              label="Ảnh"
              id="fileAvatar"
              frmField={formik.getFieldProps("imagePath")}
              err={formik.touched.imagePath && formik.errors.imagePath}
              errMessage={formik.errors.imagePath}
            />
            <div className="row">
              <div className="col-5">
                <p>Danh mục món ăn</p>
              </div>
              <div className="col-7">
                <Select
                  className="select"
                  onChange={(value) =>
                    formik.setFieldValue("cateId", value.value)
                  }
                  value={formik.values.cateId}
                  options={categorys}
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

      <Modal
        show={modalRecipeShow}
        onHide={handleModalRecipeClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Công thức</Modal.Title>
        </Modal.Header>
        <form onSubmit={formikRecipe.handleSubmit}>
          <Modal.Body>
            <Input
              id="txtQuantity"
              type="text"
              label="Số lượng"
              maxLength="100"
              frmField={formikRecipe.getFieldProps("quantity")}
              err={formikRecipe.touched.quantity && formikRecipe.errors.quantity}
              errMessage={formikRecipe.errors.quantity}
            ></Input>
            <div className="row">
              <div className="col-4">
                <p>Nguyên liệu</p>
              </div>
              <div className="col-8">
                <Select
                  className="select"
                  onChange={(value) =>
                    formikRecipe.setFieldValue("ingId", value.value)
                  }
                  value={formikRecipe.values.ingId}
                  options={ingredients}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalRecipeClose}>
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

export default Dish;
