import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems]   = useState({});
  const [food_list, setFoodList]    = useState([]);
  const [token, setToken]           = useState("");
  const [loading, setLoading]       = useState(true);
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { Authorization: `Bearer ${token}` } });
      } catch {
        toast.error("Failed to update cart");
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { Authorization: `Bearer ${token}` } });
      } catch {
        toast.error("Failed to update cart");
      }
    }
  };

  const getTotalCartAmount = () => {
    return food_list.reduce((total, item) => {
      if (cartItems[item._id] > 0) return total + item.price * cartItems[item._id];
      return total;
    }, 0);
  };

  const getTotalCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + (qty > 0 ? qty : 0), 0);
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data || []);
    } catch {
      toast.error("Failed to load menu");
    }
  };

  const loadCartData = async (tkn) => {
    try {
      const res = await axios.post(`${url}/api/cart/get`, {}, { headers: { Authorization: `Bearer ${tkn}` } });
      setCartItems(res.data.cartData || {});
    } catch {
      console.error("Cart load failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.info("Logged out successfully");
  };

  useEffect(() => {
    const init = async () => {
      await fetchFoodList();
      const stored = localStorage.getItem("token");
      if (stored) {
        setToken(stored);
        await loadCartData(stored);
      }
      setLoading(false);
    };
    init();
  }, []);

  return (
    <StoreContext.Provider value={{
      food_list, cartItems, setCartItems,
      addToCart, removeFromCart,
      getTotalCartAmount, getTotalCartCount,
      url, token, setToken, logout, loading,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
