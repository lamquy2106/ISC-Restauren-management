import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ActionTypes from "../store/action";
import foodService from "../services/foodService";
import categoryService from "../services/categoryService";
import areaService from "../services/areaService";
import orderService from "../services/orderService"
import deskService from "../services/deskService";


import { Tabs, Tab, Table, Nav, Card, Button, Form } from "react-bootstrap";
import "./menu.css";
class Menu extends Component {
  state = {
    foods: [],
    categories: [],
    areas: [],
    activeArea: 0,
    deskIdByOrder: [],
    desks: [],
    activeCategory: 0
  };

 componentDidMount() {
     this.loadData();
     this.handleSelect = this.handleSelect.bind(this)
     this.handleCategorySelect = this.handleCategorySelect.bind(this)
  }
   async loadData() {
    await areaService.getAll().then((res) => {
      this.setState({ areas: res.areas });
      this.setState({activeArea: res.areas[0].areaId})
    })
    await categoryService.getAll().then((res)=> {
      this.setState({categories: res.categories});
      this.setState({activeCategory: res.categories[0].id})
    })
    await this.loadDesk(this.state.activeArea)
    await this.loadFood(this.state.activeCategory)
  }

  async handleChooseTable(deskId) {
    // console.log(deskId)
    await deskService.getById(deskId).then((res) => {
      var deskOrder = [];
    } )
  } 
  async handleSelect(e) {
      
      //console.log(selectedTab)
      //console.log(this.state.activeArea)
        await this.setState({activeArea: e});
        await this.loadDesk(this.state.activeArea);
  }

  async handleCategorySelect(e) {
    await this.setState({activeCategory: e});
    await this.loadFood(this.state.activeCategory);
  }
  
  async loadDesk(areaId){
       await areaService.getById(areaId).then((res) => {
        this.setState({desks: res.desks});
        var deskIsOrder = res.desks.filter(desk => desk.orders[0] != undefined)
        var deskIdOrder=[];
        for(var i=0; i<deskIsOrder.length; i++)
        {
          orderService.getByDeskId(deskIsOrder[i].id).then((res) => {
            console.log(res);
          })
        }
        
    })
  }
  async loadFood(categoryId){
    await categoryService.getById(categoryId).then((res) => {
      this.setState({foods: res.dishs});
    })
  }
  // processFindOrderByIdDesk = (idDesk) =>{
  //   OrderService.createOrder(idDesk).then(res=>{
  //     this.state.deskIdByOrder.push({'order' : res.data.order,
  //                                   'desk': idDesk})
  //   })
  // }
  render() {
    var { isLogged } = this.props;
    return (
      <Switch>
        {!isLogged ? (
          <Redirect to="/login" />
        ) : (
          <div className="backgroundMenu">
            <div className="containerCustom">
              <div className="row">
                <div className="col-6">
                  <div className=" tabTable">
                    <Tabs
                      justify
                      defaultActiveKey="tableConfirm"
                      transition={false}
                      id="noanim-tab-example"
                      active
                    >
                      <Tab
                        eventKey="tableConfirm"
                        title="Bàn"
                        tabClassName="titleTab"
                        select
                      >

                          <Tabs
                            activeKey={this.state.activeArea}
                            onSelect={this.handleSelect}
                          >
                            {this.state.areas.map((area, idx) => {
                              return (
                                
                                <Tab eventKey={area.areaId}
                                  title={area.areaName}
                                >
                                  <div>
                                    <div className="p_line">
                                      Sử dụng:{" "}
                                      <p className="offset ml-2">current/Total</p>
                                    </div>
                                  </div>
                                  <div className="container flex_table">
                                    {this.state.desks.sort((a, b) => a.tableNum - b.tableNum).map((desk, idx) => {
                                      return (
                                        <div>
                                          <i class="fas fa-chair fa-3x offset_icon" id={desk.id} onClick={(e) => this.handleChooseTable(desk.id)} ></i>
                                          <p className="offset_icon">
                                            {desk.tableNum}
                                          </p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </Tab>
                                
                              );

                            })}
                          </Tabs>
                      </Tab>
                      <Tab
                        eventKey="orderHaveBeenDelivery"
                        title="Món Ăn"
                        tabClassName="titleTab"
                      >
                         <Tabs
                            activeKey={this.state.activeCategory}
                            onSelect={this.handleCategorySelect}
                          >
                            {this.state.categories.map((category, idx) => {
                              return (
                            <Tab eventKey={category.id}
                                  title={category.name}
                                >
                              <div className="container tbl-header">
                                <div className="card_define flex_food">
                                {this.state.foods.sort((a, b) => a.dishName - b.dishName).map((food, idx) => {
                                  return (
                                  <Card>
                                    <Card.Img
                                      variant="top"
                                      src="https://cdn-app.kiotviet.vn/sample/coffee/1.jpg"
                                    />
                                    <Card.Body>
                                      <div>{food.dishName}</div>
                                      <div>{food.dishPrice}</div>
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                                </div>
                              </div>
                                </Tab>
                              );
                            })}
                          </Tabs>
                        {/* <Nav variant="tabs" defaultActiveKey="link-2">
                          <Nav.Item>
                            <Nav.Link eventKey="link-2" activ>
                              Active
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                              Disabled
                            </Nav.Link>
                          </Nav.Item>
                        </Nav> */}
                        {/* <div className="container tbl-header">
                          <div className="card_define flex_food">
                            <Card>
                              <Card.Img
                                variant="top"
                                src="https://cdn-app.kiotviet.vn/sample/coffee/1.jpg"
                              />
                              <Card.Body>
                                <div>Name</div>
                                <div>Price</div>
                              </Card.Body>
                            </Card>
                          </div>
                        </div> */}
                      </Tab>
                    </Tabs>
                  </div>
                </div>
                <div className="col-6">
                  <div className=" tabTable">
                    <Tabs
                      justify
                      defaultActiveKey="tableConfirm"
                      transition={false}
                      id="noanim-tab-example"
                    >
                      <Tab
                        eventKey="tableConfirm"
                        title="Hóa đơn"
                        tabClassName="titleTab"
                        select
                      >
                        <div className="container">
                          <Table striped hover>
                            
                            <tbody>
                              <tr>
                                <td>
                                  <i class="far fa-trash-alt"></i>
                                </td>
                                <td>1</td>
                                <td>APEROL SPRITZ</td>
                                <td>
                                  <p className="textQuantity">Số lượng:</p>
                                  <div className="inlineChangeQuantity">
                                    <div
                                      className="minusButton minusText"
                                      onClick={() => this.minusQuantity()}
                                    >
                                      <i className="fas fa-minus iconMinus"></i>
                                    </div>
                                    <input
                                      type="text"
                                      className="form-control textBoxSize"
                                      id="quantityProduct"
                                      value="0"
                                      disabled
                                    />
                                    <div
                                      className="plusButton plusText"
                                      onClick={() => this.plusQuantity()}
                                    >
                                      <i className="fas fa-plus iconPlus"></i>
                                    </div>
                                  </div>
                                </td>
                                <td>@mdo</td>
                                <td>@twitter</td>
                              </tr>
                              <tr>
                                <td>
                                  <i class="far fa-trash-alt"></i>
                                </td>
                                <td>2</td>
                                <td>MILANO</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@twitter</td>
                              </tr>
                              <tr>
                                <td>
                                  <i class="far fa-trash-alt"></i>
                                </td>
                                <td>3</td>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div className="container box-container">
                          <div className="row">
                            <div className="col-2 nameCustomer">Khách hàng</div>
                            <div className="col-4">
                              <input
                                type="text"
                                className="form-control input_custom"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <div className="col-1 nameCustomer"></div>
                            <div className="col-2 nameCustomer">Tổng tiền:</div>
                            <div className="col-3 nameCustomer totalPrice">
                              100.000.000đ
                            </div>
                          </div>
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-6 button_Custom_Checkout">
                              Thanh toán
                            </div>
                            <div className="col-6 button_Custom_Notify">
                              Thông báo
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
});
export default connect(mapStateToProps)(Menu);
