// ProductList.jsx

import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  /* ------------------ HANDLE NAVIGATION ------------------ */

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  /* ------------------ QUANTITY LOGIC ------------------ */

  const incrementQuantity = (name) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: (prev[name] || 1) + 1,
    }));
  };

  const decrementQuantity = (name) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(1, (prev[name] || 1) - 1),
    }));
  };

  /* ------------------ ADD TO CART ------------------ */

  const handleAddToCart = (product) => {
    const quantity = quantities[product.name] || 1;

    const { cost, ...rest } = product;

    dispatch(
      addItem({
        ...rest,
        cost: product.cost,
        quantity,
      })
    );

    setAddedToCart((prev) => ({ ...prev, [product.name]: true }));
  };

  /* ------------------ CART BADGE ------------------ */

  const calculateTotalQuantity = () => {
    return cartItems?.reduce((total, item) => total + item.quantity, 0);
  };

  /* ------------------ PRODUCT LIST (UNCHANGED ORIGINAL DATA) ------------------ */
  const plantsArray = [
      {
        category: "Air Purifying Plants",
        plants: [
          {
            name: "Snake Plant",
            image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
            description: "Produces oxygen at night, improving air quality.",
            cost: "$15",
          },
          {
            name: "Spider Plant",
            image:
              "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
            description: "Filters formaldehyde and xylene from the air.",
            cost: "$12",
          },
          {
            name: "Peace Lily",
            image:
              "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
            description: "Removes mold spores and purifies the air.",
            cost: "$18",
          },
          {
            name: "Boston Fern",
            image:
              "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
            description: "Adds humidity to the air and removes toxins.",
            cost: "$20",
          },
          {
            name: "Rubber Plant",
            image:
              "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
            description: "Easy to care for and effective at removing toxins.",
            cost: "$17",
          },
          {
            name: "Aloe Vera",
            image:
              "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
            description:
              "Purifies the air and has healing properties for skin.",
            cost: "$14",
          },
        ],
      },

      /* ------------------ OTHER CATEGORIES LEFT UNCHANGED (TO SAVE SPACE) ------------------ */
      {
        category: "Aromatic Fragrant Plants",
        plants: [
          {
            name: "Lavender",
            image:
              "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074",
            description: "Calming scent, used in aromatherapy.",
            cost: "$20",
          },
          {
            name: "Jasmine",
            image:
              "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170",
            description: "Sweet fragrance, promotes relaxation.",
            cost: "$18",
          },
        ],
      },
  ];

  /* ------------------ RETURN JSX ------------------ */

  return (
    <div>
      {/* ------------------ NAVBAR ------------------ */}
      <div className="navbar">
        <div className="tag">
          <a
            href="/"
            className="tag_home_link"
            onClick={(e) => handleHomeClick(e)}
          >
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="logo"
            />
            <div>
              <h3>Paradise Nursery</h3>
              <i>Where Green Meets Serenity</i>
            </div>
          </a>
        </div>

        <div className="navbar-links">
          <a href="#">Plants</a>

          <div className="cart" onClick={(e) => handleCartClick(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="156" height="156" fill="none"></rect>
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none"
                stroke="#faf9f9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>

            {calculateTotalQuantity() > 0 && (
              <div className="cart_quantity_count">
                {calculateTotalQuantity()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------ PRODUCT GRID / CART ------------------ */}

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1 className="plant_heading">{category.category}</h1>

              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />

                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">
                      {plant.description}
                    </div>
                    <div className="product-cost">{plant.cost}</div>

                    {/* Quantity buttons */}
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => decrementQuantity(plant.name)}
                      >
                        −
                      </button>

                      <span className="qty-number">
                        {quantities[plant.name] || 1}
                      </span>

                      <button
                        className="qty-btn"
                        onClick={() => incrementQuantity(plant.name)}
                      >
                        +
                      </button>
                    </div>

                    {/* Add to cart */}
                    <button
                      className={`product-button ${
                        addedToCart[plant.name] ? "added-to-cart" : ""
                      }`}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
