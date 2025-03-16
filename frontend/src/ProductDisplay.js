import React, { useState, useEffect } from "react";
import axios from "axios";



const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleColorChange = (productName, color) => {
    setSelectedColors((prev) => ({ ...prev, [productName]: color }));
  };

  const colorOptions = {
    yellow: { name: "Yellow Gold", code: "#E6CA97" },
    white: { name: "White Gold", code: "#D9D9D9" },
    rose: { name: "Rose Gold", code: "#E1A4A9" },
  };
  
  
  function updateStars(ratingElement) {
    let rating = parseFloat(ratingElement.getAttribute("data-rating"));
    let stars = ratingElement.querySelectorAll(".star");

    stars.forEach(star => {
        let value = parseFloat(star.getAttribute("data-value"));

        if (value <= rating) {
            star.classList.add("active");
            star.classList.remove("half");
        } else if (value - 0.5 === rating) {
            star.classList.add("half");
        } else {
            star.classList.remove("active", "half");
        }
    });

    // Sayısal puanı güncelle
    let ratingValueElement = ratingElement.nextElementSibling;
    if (ratingValueElement) {
        ratingValueElement.textContent = rating.toFixed(1); // Ondalık kısmı 1 haneye ayarla
    }
}

     // Tüm rating bileşenlerini güncelle
    document.querySelectorAll(".rating").forEach(updateStars);


  return (
    <div className="start">

      <div className="allcontainers">
        {products.map((product) => {
          const selectedColor = selectedColors[product.name] || "yellow";
          const popularityOutOf5 = (product.popularityScore * 5).toFixed(1);


          return (
            <div key={product.name} className="contanier">
              <div>
                <img
                  src={product.images[selectedColor]}
                  alt={product.name}
                  className="images"
                />
              </div>
              <div className="p4">
                <h2 className="uruntext">
                  {product.name}
                </h2>
                <p className="money">
                  ${product.price} USD
                </p>


                <div className="allcolorborders">
                  {Object.keys(colorOptions).map((color) => (
                    <button
                      key={color}
                      className={`colorborder ${selectedColor === color ? "border-black" : "border-gray-300"
                        }`}
                      style={{ backgroundColor: colorOptions[color].code }}
                      onClick={() => handleColorChange(product.name, color)}
                    >

                    </button>
                  ))}
                </div>
                <p className="colorname">{colorOptions[selectedColor].name}</p>
                <p className="stars">
                  <div class="rating" data-rating="">
                    <span class="star" data-value="1">&#9733;</span>
                    <span class="star" data-value="2">&#9733;</span>
                    <span class="star" data-value="3">&#9733;</span>
                    <span class="star" data-value="4">&#9733;</span>
                    <span class="star" data-value="5">&#9733;</span>
                  
                    <span class="startext"> {popularityOutOf5} / 5</span>
                  </div> 
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;
