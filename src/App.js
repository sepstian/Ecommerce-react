import React, { useEffect, useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/index';
import About from './pages/About/index';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/Details';
import Checkout from './pages/checkout';

import axios from 'axios';
import Cart from './pages/cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Loader from './assets/images/loading.gif';

import data from './data';
import { useDispatch, useSelector } from 'react-redux';
import { delete_cart, update_cart, update_quantity } from './redux/slice/cartSlice';

const MyContext = createContext();

function App() {
  const dispatch = useDispatch()
  const dataCart = useSelector((state) => state.cartSlice);
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isopenNavigation, setIsopenNavigation] = useState(false);

  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsopenFilters] = useState(false);
  const [cartTotalAmount, setCartTotalAmount] = useState();

  useEffect(() => {
  const is_Login = localStorage.getItem('isLogin');
  setIsLogin(is_Login);

  // ⬅️ Ambil cart dari localStorage jika ada
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    dispatch(update_cart(JSON.parse(savedCart)));
  }

  setTimeout(() => {
    setProductData(data[1]);
    setIsloading(false);
  }, 3000);
}, []);

useEffect(() => {
  // ⬅️ Simpan cart ke localStorage setiap kali berubah
  localStorage.setItem("cart", JSON.stringify(dataCart.cart));
}, [dataCart.cart]);

  
  useEffect(() => {
    // getData('http://localhost:5000/productData');
    // getCartData("http://localhost:5000/cartItems");

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);

      setTimeout(() => {
        setProductData(data[1]);
        setIsloading(false);
      }, 3000);


  }, []);


  useEffect(() => {
    // getCartData("http://localhost:5000/cartItems");
}, []);


  // const getData = async (url) => {
  //   try {
  //     await axios.get(url).then((response) => {
  //       setProductData(response.data);
  //       setTimeout(()=>{
  //         setIsloading(false);
  //       },2000); 
  //     })


  //     await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=27dad2d0abd34a22965727ce8d939077').then((response) => {
  //         console.log(response)
  //     })



  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // const getCartData = async (url) => {
  //   try {
  //       await axios.get(url).then((response) => {
  //           setCartItems(response.data);
  //       })

  //   } catch (error) {
  //       console.log(error.message);
  //   }
  // }

  const addToCart = async (item) => {
    const existingProduct = dataCart.cart.find(cartItem => cartItem.id === item.id);
    
    if (existingProduct) {
        // Jika produk sudah ada, tambahkan kuantitasnya
        dispatch(update_quantity({
            id: item.id, 
            quantity: existingProduct.quantity + 1 
        }));
    } else {
        // Jika produk belum ada di cart, tambahkan produk dengan kuantitas 1
        dispatch(update_cart([...dataCart.cart, { ...item, quantity: 1 }]));
    }
  }
  // try {
  //   await axios.post("http://localhost:5000/cartItems", item).then((res) => {
  //     if (res !== undefined) {
  //       setCartItems([...cartItems, { ...item, quantity: 1 }])
  //     }
  //   })
  // } catch (error) {
  //   console.log(error)
  // }

  const removeItemsFromCart = (id) => {
    const arr = cartItems.filter((obj) => obj.id !== id);
    setCartItems(arr)
  }

  const emptyCart = () => {
    setCartItems([])
    dispatch(delete_cart());
  }


  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }


  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
  }


  const openFilters=()=>{
    setIsopenFilters(!isOpenFilters)
  }

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isopenNavigation,
    setIsopenNavigation,
    setCartTotalAmount,
    cartTotalAmount,
    // getCartData,
    setCartItems
  }

  return (
    
    data.productData.length !== 0 &&
    <MyContext.Provider value={value}>
      {
        isLoading===true && <div className='loader'><img src={Loader}/></div>
      }
      <Header data={data.productData} />
      <Routes>
        <Route exact={true} path="/" element={<Home data={data.productData} />} />
        <Route exact={true} path="/cat/:id" element={<Listing data={data.productData} single={true} />} />
        <Route exact={true} path="/cat/:id/:id" element={<Listing data={data.productData} single={false} />} />
        <Route exact={true} path="/product/:id" element={<DetailsPage data={data.productData} />} />
        <Route exact={true} path="/cart" element={<Cart />} />
        <Route exact={true} path="/signIn" element={<SignIn />} />
        <Route exact={true} path="/signUp" element={<SignUp />} />
        <Route exact={true} path="/checkout" element={<Checkout />} />
        <Route exact={true} path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </MyContext.Provider>
  );
}

export default App;

export { MyContext }
