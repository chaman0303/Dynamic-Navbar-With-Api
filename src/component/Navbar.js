import React, { useState, useEffect } from "react";
import "../Assets/navStyle.css";
import vituLogo from "../Assets/vitu.png";
import "../Assets/coming-soon.jpg";

const Navbar = () => {
  const [navData, setNavData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
      fetch("https://ecomm.dotvik.com/v2kart/service/categories/mainCategories")
          .then((response) => response.json())
          .then((data) => setNavData(data.data))
          .catch((error) => console.error("Error fetching data:", error));
  }, []);


  const handleMouseEnter = (id, url) => {
    fetch(`https://ecomm.dotvik.com/v2kart/service/categories/${url}/tree`)
      .then((response) => response.json())
      .then((data) => {
        setChildData(data.data.childCategory);
        setSubData(data.data.subCategory);
        setHoveredCategory(id);
        setShowModal(true);
      })
      .catch((error) => console.error("Error fetching item content:", error));
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setShowModal(false);
  };

  const openImageModal = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  console.log(navData, "data");

  console.log("item-------", subData, childData);
  return (
    <div className="navbar">
      <div className="navbar-logo">
        {/* <img src={require("../Assets/vitu.png")} alt="Logo" /> */}
        <img src={vituLogo} alt="Logo" />
      </div>
      <div className="navbar-tab">
        <div className="horizontal-line">
          {navData.map((item, index) => (
            <div
              key={index}
              className="nav-data"
              onMouseEnter={() => handleMouseEnter(item.id, item.urlKey)}
            >
              {item.categoryName}
            </div>
          ))}
        </div>
      </div>
      
      {showModal && hoveredCategory !== null && (
                <div className="modal" onMouseLeave={handleMouseLeave}>
                   
                    <div className="modal-subcategory">
                        {subData.length > 0 ? subData.map((i, index) => (
                            <div key={index}>
                                <div className="modal-title" style={{ color: "aqua", marginTop: "2rem" }}>{i.categoryName}</div>
                                {childData &&
                                    childData.map((childCategory, childItem) => {
                                        if (i.id === childCategory.parentId) {
                                            return (
                                                <div key = {childItem} className="modal-subcategory" style={{ color: "black", cursor: "pointer" }}>
                                                    <ul>
                                                        <li onClick={() => openImageModal(childCategory.images[0].imageUrl)}>{childCategory.categoryName}</li>
                                                    </ul>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                            </div>
                        )): <img src={require("../Assets/coming-soon.jpg")} alt="comming-soon" />
                        }
                    </div>
                </div>
            )}
    </div>
  );
};

export default Navbar;
