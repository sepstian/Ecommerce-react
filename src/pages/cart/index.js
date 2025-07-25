import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Rating } from "@mui/material";
import { Button } from "@mui/material";
import QuantityBox from "../../components/quantityBox";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MyContext } from "../../App";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_item,
  update_cart,
  update_quantity,
} from "../../redux/slice/cartSlice";
import Swal from "sweetalert2";

// import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const context = useContext(MyContext);
  const history = useNavigate();
  const dataCart = useSelector((state) => state.cartSlice.cart);

  useEffect(() => {
    // if (context.isLogin !== "true") {
    //     history('/signIn');
    // }
    window.scrollTo(0, 0);
    context.setCartItems(context.cartItems);
  }, []);

  const deleteItem = async (id) => {
    dispatch(delete_item(id));
    // const response = await axios.delete(`http://localhost:5000/cartItems/${id}`);
    // if (response !== null) {
    //     context.getCartData("http://localhost:5000/cartItems");
    //     context.removeItemsFromCart(id);
    // }
  };

  const emptyCart = () => {
    let response = null;
    dataCart.length !== 0 &&
      // dataCart.map((item) => {
      //     response = axios.delete(`http://localhost:5000/cartItems/${parseInt(item.id)}`);
      // })
      // cartItems.length !== 0 &&
      //     cartItems.map((item) => {
      //         response = axios.delete(`http://localhost:5000/cartItems/${parseInt(item.id)}`);
      //     })
      // if (response !== null) {
      //     context.getCartData("http://localhost:5000/cartItems");
      // }

      context.emptyCart();
  };

  const updateCart = (items) => {
    items.forEach((item) => {
      dispatch(update_quantity({ id: item.id, quantity: item.quantity }));
    });
    context.setCartItems(items);
  };

  function formatRibuan(number) {
    if (typeof number !== "undefined" && number !== null) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return "0";
    }
  }

  // const makePayment = async () => {
  //     const stripe = await loadStripe('pk_test_51OSafaSEi0nlwkT6fE5zbDHnNLjJoQ6INy7jZmoAycZjR0uPPxQ7Fv7eCKLfBELmCJ3vJK1pVWmMLC9c8X7xJTYK00l4lDuWMG');

  //     const body = {
  //         products: cartItems
  //     }

  //     const headers = {
  //         "Content-Type": "application/json"
  //     }

  //     const response = await fetch("http://localhost:7000/api/create-checkout-session", {
  //         method: 'POST',
  //         headers: headers,
  //         body: JSON.stringify(body)
  //     })

  //     const session = await response.json();

  //     const result = stripe.redirectToCheckout({
  //         sessionId: session.id
  //     })

  //     if (result.error) {
  //         console.log(result.error)
  //     }
  // }

  return (
    <>
      {context.windowWidth > 992 && (
        <div className="breadcrumbWrapper mb-4">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Shop</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
      )}

      <section className="cartSection mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex align-items-center w-100">
                <div className="left">
                  <h1 className="hd mb-0">Your Cart</h1>
                  <p>
                    There are <span className="text-g">{dataCart.length}</span>{" "}
                    products in your cart
                  </p>
                </div>

                <span
                  className="ml-auto clearCart d-flex align-items-center cursor "
                  onClick={() => emptyCart()}
                >
                  <DeleteOutlineOutlinedIcon /> Clear Cart
                </span>
              </div>

              <div className="cartWrapper mt-4">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dataCart.length !== 0 &&
                        dataCart?.map((item, index) => {
                          return (
                            <tr>
                              <td width={"50%"}>
                                <div className="d-flex align-items-center">
                                  <div className="img">
                                    <Link to={`/product/${item.id}`}>
                                      <img
                                        src={
                                          item.catImg + "?im=Resize=(100,100)"
                                        }
                                        className="w-100"
                                      />
                                    </Link>
                                  </div>
                                        
                                  <div className="info pl-4">
                                    <Link to={`/product/${item.id}`}>
                                      <h4>{item.productName}</h4>
                                    </Link>
                                    <Rating
                                      name="half-rating-read"
                                      value={parseFloat(item.rating)}
                                      precision={0.5}
                                      readOnly
                                    />{" "}
                                    <span className="text-light">
                                      ({parseFloat(item.rating)})
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td width="20%">
                                <span>
                                  Rp.{" "}
                                  {formatRibuan(
                                    parseInt(item.price.split(",").join(""))
                                  )}
                                </span>
                              </td>

                              <td>
                                <QuantityBox
                                  item={item}
                                  cartItems={dataCart}
                                  index={index}
                                  updateCart={updateCart}
                                />
                              </td>

                              <td>
                                <span className="text-g">
                                  Rp.{" "}
                                  {formatRibuan(
                                    parseInt(item.price.split(",").join("")) *
                                      parseInt(item.quantity)
                                  )}
                                </span>
                              </td>

                              <td align="center">
                                <span
                                  className="cursor"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              <br />

              <div className="d-flex align-items-center">
                <Link to="/">
                  <Button className="btn-g">
                    <KeyboardBackspaceIcon /> Continue Shopping
                  </Button>
                </Link>
                {/* <Button className='btn-g ml-auto' onClick={updateCartData}>
                    <RefreshIcon /> Update Cart</Button> */}
              </div>
            </div>

            <div className="col-md-4 cartRightBox">
              <div className="card p-4 ">
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Subtotal</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">
                      Rp.{" "}
                      {dataCart.length !== 0
                        ? formatRibuan(
                            dataCart
                              .map(
                                (item) =>
                                  parseInt(item.price.split(",").join("")) *
                                  item.quantity
                              )
                              .reduce((total, value) => total + value, 0)
                          )
                        : "0"}
                    </span>
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Shipping</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span>Free</span>
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Estimate for</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">Indonesia</h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 text-light">Total</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold">
                    <span className="text-g">
                      Rp.{" "}
                      {dataCart.length !== 0
                        ? formatRibuan(
                            dataCart
                              .map(
                                (item) =>
                                  parseInt(item.price.split(",").join("")) *
                                  item.quantity
                              )
                              .reduce((total, value) => total + value, 0)
                          )
                        : "0"}
                    </span>
                  </h3>
                </div>

                <br />

                <Button
                  className="btn-g btn-lg"
                  onClick={() => {
                    if (dataCart.length === 0) {
                      Swal.fire({
                        icon: "warning",
                        title: "Keranjang Kosong",
                        text: "Silakan tambahkan produk ke keranjang terlebih dahulu.",
                      });
                      return;
                    }

                    // Hitung total & set ke context
                    const total = dataCart
                      .map(
                        (item) =>
                          parseInt(item.price.split(",").join("")) *
                          item.quantity
                      )
                      .reduce((total, value) => total + value, 0);

                    context.setCartTotalAmount(total);

                    // Navigate ke checkout
                    navigate("/checkout");
                  }}
                >
                  Proceed To CheckOut
                </Button>
                  
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
