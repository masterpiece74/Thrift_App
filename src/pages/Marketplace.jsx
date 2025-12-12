import React, { useState } from "react";
import {
  FaShoppingCart,
  FaTimesCircle,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import MarketplaceBanner from "../components/MarketplaceBanner";

const PRODUCTS = [
  // Phones
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 650000,
    category: "Phones",
    image: "🍎",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 580000,
    category: "Phones",
    image: "🔷",
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 520000,
    category: "Phones",
    image: "🔵",
  },
  { id: 4, name: "OnePlus 12", price: 480000, category: "Phones", image: "🔴" },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    price: 450000,
    category: "Phones",
    image: "🟡",
  },
  { id: 6, name: "iPhone 15", price: 580000, category: "Phones", image: "🍎" },
  {
    id: 7,
    name: "Samsung Galaxy A55",
    price: 320000,
    category: "Phones",
    image: "🔷",
  },
  {
    id: 8,
    name: "Motorola Edge 50 Pro",
    price: 400000,
    category: "Phones",
    image: "⚪",
  },
  {
    id: 9,
    name: "Nothing Phone 2a",
    price: 380000,
    category: "Phones",
    image: "⚫",
  },
  {
    id: 10,
    name: "Vivo X100 Pro",
    price: 520000,
    category: "Phones",
    image: "🟣",
  },
  {
    id: 11,
    name: "OPPO Find X7",
    price: 490000,
    category: "Phones",
    image: "🟠",
  },
  {
    id: 12,
    name: "Realme 12 Pro Plus",
    price: 350000,
    category: "Phones",
    image: "🟢",
  },
  {
    id: 13,
    name: "Tecno Phantom X2",
    price: 280000,
    category: "Phones",
    image: "🟡",
  },
  {
    id: 14,
    name: "Infinix Zero 40",
    price: 320000,
    category: "Phones",
    image: "🔴",
  },
  {
    id: 15,
    name: "Samsung Galaxy Z Fold 6",
    price: 1800000,
    category: "Phones",
    image: "🔷",
  },

  // Laptops
  {
    id: 16,
    name: "MacBook Pro M3",
    price: 2800000,
    category: "Laptops",
    image: "🍎",
  },
  {
    id: 17,
    name: "Dell XPS 15",
    price: 1900000,
    category: "Laptops",
    image: "🖥️",
  },
  {
    id: 18,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1600000,
    category: "Laptops",
    image: "💼",
  },
  {
    id: 19,
    name: "HP Spectre x360",
    price: 1750000,
    category: "Laptops",
    image: "🖥️",
  },
  {
    id: 20,
    name: "ASUS VivoBook 15",
    price: 950000,
    category: "Laptops",
    image: "💻",
  },
  {
    id: 21,
    name: "MacBook Air M2",
    price: 1850000,
    category: "Laptops",
    image: "🍎",
  },
  {
    id: 22,
    name: "Acer Aspire 5",
    price: 850000,
    category: "Laptops",
    image: "🖥️",
  },
  {
    id: 23,
    name: "MSI GF63 Thin",
    price: 1200000,
    category: "Laptops",
    image: "⚡",
  },
  {
    id: 24,
    name: "Razer Blade 14",
    price: 2200000,
    category: "Laptops",
    image: "🎮",
  },
  {
    id: 25,
    name: "ROG Gaming Laptop",
    price: 2500000,
    category: "Laptops",
    image: "⚡",
  },
  {
    id: 26,
    name: "Surface Laptop 6",
    price: 1700000,
    category: "Laptops",
    image: "💻",
  },
  {
    id: 27,
    name: "Framework Laptop",
    price: 1400000,
    category: "Laptops",
    image: "🖥️",
  },
  {
    id: 28,
    name: "Chromebook Pixel",
    price: 650000,
    category: "Laptops",
    image: "📱",
  },
  {
    id: 29,
    name: "LG Gram 17",
    price: 1600000,
    category: "Laptops",
    image: "⚪",
  },
  {
    id: 30,
    name: "Alienware Area-51m",
    price: 3200000,
    category: "Laptops",
    image: "🎮",
  },

  // Tablets
  { id: 31, name: "iPad Air", price: 450000, category: "Tablets", image: "🍎" },
  {
    id: 32,
    name: "iPad Pro 12.9",
    price: 850000,
    category: "Tablets",
    image: "🍎",
  },
  {
    id: 33,
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 750000,
    category: "Tablets",
    image: "🔷",
  },
  {
    id: 34,
    name: "iPad mini",
    price: 350000,
    category: "Tablets",
    image: "🍎",
  },
  {
    id: 35,
    name: "Microsoft Surface Pro 10",
    price: 900000,
    category: "Tablets",
    image: "💻",
  },
  {
    id: 36,
    name: "Google Pixel Tablet",
    price: 420000,
    category: "Tablets",
    image: "🔵",
  },
  {
    id: 37,
    name: "Lenovo Tab Extreme",
    price: 550000,
    category: "Tablets",
    image: "💼",
  },
  {
    id: 38,
    name: "OnePlus Pad",
    price: 480000,
    category: "Tablets",
    image: "🔴",
  },
  {
    id: 39,
    name: "iPad (10th Gen)",
    price: 280000,
    category: "Tablets",
    image: "🍎",
  },
  {
    id: 40,
    name: "Samsung Galaxy Tab A9",
    price: 220000,
    category: "Tablets",
    image: "🔷",
  },
  {
    id: 41,
    name: "Xiaomi Pad 6 Pro",
    price: 520000,
    category: "Tablets",
    image: "🟡",
  },
  {
    id: 42,
    name: "Honor Pad 9",
    price: 380000,
    category: "Tablets",
    image: "🟠",
  },
  {
    id: 43,
    name: "Realme Pad X",
    price: 320000,
    category: "Tablets",
    image: "🟢",
  },
  {
    id: 44,
    name: "ZTE Nubia Tab M10",
    price: 280000,
    category: "Tablets",
    image: "⚫",
  },
  {
    id: 45,
    name: "Amazon Fire Max 11",
    price: 250000,
    category: "Tablets",
    image: "🔥",
  },

  // Accessories
  {
    id: 46,
    name: "AirPods Pro Max",
    price: 350000,
    category: "Accessories",
    image: "🎧",
  },
  {
    id: 47,
    name: "Sony WH-1000XM5",
    price: 280000,
    category: "Accessories",
    image: "🎧",
  },
  {
    id: 48,
    name: "Apple Watch Ultra",
    price: 420000,
    category: "Accessories",
    image: "⌚",
  },
  {
    id: 49,
    name: "Samsung Galaxy Watch 6",
    price: 180000,
    category: "Accessories",
    image: "⌚",
  },
  {
    id: 50,
    name: "DJI Air 3S Drone",
    price: 850000,
    category: "Accessories",
    image: "🚁",
  },
  {
    id: 51,
    name: "GoPro Hero 12",
    price: 320000,
    category: "Accessories",
    image: "📷",
  },
  {
    id: 52,
    name: "Canon EOS R6 Mark II",
    price: 2200000,
    category: "Accessories",
    image: "📷",
  },
  {
    id: 53,
    name: "Sony A7 IV",
    price: 1800000,
    category: "Accessories",
    image: "📷",
  },
  {
    id: 54,
    name: "Nikon Z8",
    price: 2100000,
    category: "Accessories",
    image: "📷",
  },
  {
    id: 55,
    name: "JBL Flip 6 Speaker",
    price: 95000,
    category: "Accessories",
    image: "🔊",
  },
  {
    id: 56,
    name: "Bose SoundLink Ultra",
    price: 180000,
    category: "Accessories",
    image: "🔊",
  },
  {
    id: 57,
    name: "Magic Keyboard",
    price: 85000,
    category: "Accessories",
    image: "⌨️",
  },
  {
    id: 58,
    name: "Logitech MX Master 3S",
    price: 45000,
    category: "Accessories",
    image: "🖱️",
  },
  {
    id: 59,
    name: "HyperX Cloud Flight",
    price: 125000,
    category: "Accessories",
    image: "🎧",
  },
  {
    id: 60,
    name: "Razer DeathAdder V3",
    price: 65000,
    category: "Accessories",
    image: "🖱️",
  },

  // Smart Home
  {
    id: 61,
    name: "Amazon Echo Studio",
    price: 85000,
    category: "Smart Home",
    image: "📢",
  },
  {
    id: 62,
    name: "Google Home Max",
    price: 95000,
    category: "Smart Home",
    image: "📢",
  },
  {
    id: 63,
    name: "Philips Hue Smart Lights",
    price: 125000,
    category: "Smart Home",
    image: "💡",
  },
  {
    id: 64,
    name: "Nest Learning Thermostat",
    price: 75000,
    category: "Smart Home",
    image: "🌡️",
  },
  {
    id: 65,
    name: "Ring Video Doorbell Pro",
    price: 95000,
    category: "Smart Home",
    image: "🚪",
  },
  {
    id: 66,
    name: "Wyze Cam Pan v3",
    price: 35000,
    category: "Smart Home",
    image: "📹",
  },
  {
    id: 67,
    name: "Arlo Pro 4 Spotlight",
    price: 185000,
    category: "Smart Home",
    image: "📹",
  },
  {
    id: 68,
    name: "Eve Energy Smart Plug",
    price: 15000,
    category: "Smart Home",
    image: "🔌",
  },
  {
    id: 69,
    name: "Nanoleaf Essentials Lightstrip",
    price: 65000,
    category: "Smart Home",
    image: "💡",
  },
  {
    id: 70,
    name: "LIFX Color A19 Bulb",
    price: 28000,
    category: "Smart Home",
    image: "💡",
  },
  {
    id: 71,
    name: "Sonos Arc Speaker",
    price: 425000,
    category: "Smart Home",
    image: "🔊",
  },
  {
    id: 72,
    name: "August Smart Lock Pro",
    price: 95000,
    category: "Smart Home",
    image: "🔐",
  },
  {
    id: 73,
    name: "Nest Hub Max",
    price: 145000,
    category: "Smart Home",
    image: "📱",
  },
  {
    id: 74,
    name: "Echo Dot 5th Gen",
    price: 35000,
    category: "Smart Home",
    image: "📢",
  },
  {
    id: 75,
    name: "Govee Outdoor String Lights",
    price: 55000,
    category: "Smart Home",
    image: "💡",
  },

  // Gaming
  {
    id: 76,
    name: "PlayStation 5",
    price: 350000,
    category: "Gaming",
    image: "🎮",
  },
  {
    id: 77,
    name: "Xbox Series X",
    price: 360000,
    category: "Gaming",
    image: "🎮",
  },
  {
    id: 78,
    name: "Nintendo Switch OLED",
    price: 250000,
    category: "Gaming",
    image: "🎮",
  },
  {
    id: 79,
    name: "Meta Quest 3",
    price: 420000,
    category: "Gaming",
    image: "🥽",
  },
  {
    id: 80,
    name: "HTC Vive XR Elite",
    price: 680000,
    category: "Gaming",
    image: "🥽",
  },
  {
    id: 81,
    name: "PlayStation VR2",
    price: 420000,
    category: "Gaming",
    image: "🥽",
  },
  {
    id: 82,
    name: "Steam Deck OLED",
    price: 380000,
    category: "Gaming",
    image: "🎮",
  },
  {
    id: 83,
    name: "Corsair K95 Platinum",
    price: 95000,
    category: "Gaming",
    image: "⌨️",
  },
  {
    id: 84,
    name: "ASUS ROG Ally",
    price: 380000,
    category: "Gaming",
    image: "🎮",
  },
  {
    id: 85,
    name: "SCUF Reflex Pro Controller",
    price: 65000,
    category: "Gaming",
    image: "🕹️",
  },
  {
    id: 86,
    name: "SteelSeries Arctis Pro",
    price: 125000,
    category: "Gaming",
    image: "🎧",
  },
  {
    id: 87,
    name: "BenQ EL2870U Gaming Monitor",
    price: 320000,
    category: "Gaming",
    image: "🖥️",
  },
  {
    id: 88,
    name: "ASUS ROG Swift 240Hz",
    price: 580000,
    category: "Gaming",
    image: "🖥️",
  },
  {
    id: 89,
    name: "Nintendo Switch Lite",
    price: 150000,
    category: "Gaming",
    image: "🎮",
  },
  {
    id: 90,
    name: "Xbox Controller Elite Series 2",
    price: 55000,
    category: "Gaming",
    image: "🕹️",
  },

  // Wearables
  {
    id: 91,
    name: "Fitbit Sense 2",
    price: 95000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 92,
    name: "Garmin Epix Gen 2",
    price: 185000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 93,
    name: "Apple Watch Series 9",
    price: 280000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 94,
    name: "Xiaomi Watch S1 Pro",
    price: 95000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 95,
    name: "Suunto 9 Peak Pro",
    price: 220000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 96,
    name: "Google Pixel Watch 2",
    price: 165000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 97,
    name: "Huawei Band 8 Pro",
    price: 65000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 98,
    name: "Amazfit GTR 4",
    price: 75000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 99,
    name: "Polar Vantage V3",
    price: 280000,
    category: "Wearables",
    image: "⌚",
  },
  {
    id: 100,
    name: "Coros Vertix 2S",
    price: 320000,
    category: "Wearables",
    image: "⌚",
  },
  // Additional
  {
    id: 101,
    name: "Redmi 13C",
    price: 120000,
    category: "Phones",
    image: "📱",
  },

  // Raw Foods
  {
    id: 102,
    name: "Tomatoes (5kg)",
    price: 2500,
    category: "Raw Foods",
    image: "🍅",
  },
  {
    id: 103,
    name: "Onions (5kg)",
    price: 1800,
    category: "Raw Foods",
    image: "🧅",
  },
  {
    id: 104,
    name: "Garlic (1kg)",
    price: 1200,
    category: "Raw Foods",
    image: "🧄",
  },
  {
    id: 105,
    name: "Potatoes (5kg)",
    price: 2000,
    category: "Raw Foods",
    image: "🥔",
  },
  {
    id: 106,
    name: "Carrots (3kg)",
    price: 1500,
    category: "Raw Foods",
    image: "🥕",
  },
  {
    id: 107,
    name: "Cabbage (2kg)",
    price: 1000,
    category: "Raw Foods",
    image: "🥬",
  },
  {
    id: 108,
    name: "Bell Peppers (1kg)",
    price: 2500,
    category: "Raw Foods",
    image: "🫑",
  },
  {
    id: 109,
    name: "Spinach (500g)",
    price: 800,
    category: "Raw Foods",
    image: "🥬",
  },
  {
    id: 110,
    name: "Lettuce (1kg)",
    price: 1200,
    category: "Raw Foods",
    image: "🥬",
  },
  {
    id: 111,
    name: "Cucumbers (3 pcs)",
    price: 1500,
    category: "Raw Foods",
    image: "🥒",
  },
  {
    id: 112,
    name: "Broccoli (1kg)",
    price: 2000,
    category: "Raw Foods",
    image: "🥦",
  },
  {
    id: 113,
    name: "Green Beans (2kg)",
    price: 2200,
    category: "Raw Foods",
    image: "🫘",
  },
  {
    id: 114,
    name: "Corn (3 pieces)",
    price: 1800,
    category: "Raw Foods",
    image: "🌽",
  },
  {
    id: 115,
    name: "Eggplant (2kg)",
    price: 1600,
    category: "Raw Foods",
    image: "🍆",
  },
  {
    id: 116,
    name: "Ginger (500g)",
    price: 1000,
    category: "Raw Foods",
    image: "🫚",
  },
  {
    id: 117,
    name: "Apples (2kg)",
    price: 3500,
    category: "Raw Foods",
    image: "🍎",
  },
  {
    id: 118,
    name: "Oranges (3kg)",
    price: 2500,
    category: "Raw Foods",
    image: "🍊",
  },
  {
    id: 119,
    name: "Bananas (1 bunch)",
    price: 1500,
    category: "Raw Foods",
    image: "🍌",
  },
  {
    id: 120,
    name: "Mangoes (3kg)",
    price: 4000,
    category: "Raw Foods",
    image: "🥭",
  },
  {
    id: 121,
    name: "Watermelons (1 pc)",
    price: 3000,
    category: "Raw Foods",
    image: "🍉",
  },
  {
    id: 122,
    name: "Strawberries (500g)",
    price: 3000,
    category: "Raw Foods",
    image: "🍓",
  },
  {
    id: 123,
    name: "Pineapples (2 pcs)",
    price: 5000,
    category: "Raw Foods",
    image: "🍍",
  },
  {
    id: 124,
    name: "Coconut (1 pc)",
    price: 1500,
    category: "Raw Foods",
    image: "🥥",
  },
  {
    id: 125,
    name: "Rice (50kg)",
    price: 18000,
    category: "Raw Foods",
    image: "🍚",
  },
  {
    id: 126,
    name: "Beans (10kg)",
    price: 12000,
    category: "Raw Foods",
    image: "🫘",
  },
  {
    id: 127,
    name: "Flour (10kg)",
    price: 8000,
    category: "Raw Foods",
    image: "🌾",
  },
  {
    id: 128,
    name: "Sugar (5kg)",
    price: 3500,
    category: "Raw Foods",
    image: "🍬",
  },
  {
    id: 129,
    name: "Salt (2kg)",
    price: 800,
    category: "Raw Foods",
    image: "🧂",
  },
  {
    id: 130,
    name: "Eggs (1 crate-30)",
    price: 3500,
    category: "Raw Foods",
    image: "🥚",
  },
  {
    id: 131,
    name: "Chicken (2kg)",
    price: 6500,
    category: "Raw Foods",
    image: "🍗",
  },
  {
    id: 132,
    name: "Beef (2kg)",
    price: 8000,
    category: "Raw Foods",
    image: "🥩",
  },
  {
    id: 133,
    name: "Fish (2kg)",
    price: 7500,
    category: "Raw Foods",
    image: "🐟",
  },
  {
    id: 134,
    name: "Milk (1 liter)",
    price: 800,
    category: "Raw Foods",
    image: "🥛",
  },
  {
    id: 135,
    name: "Cheese (500g)",
    price: 3000,
    category: "Raw Foods",
    image: "🧀",
  },
  {
    id: 136,
    name: "Butter (500g)",
    price: 2500,
    category: "Raw Foods",
    image: "🧈",
  },
  {
    id: 137,
    name: "Yam (5kg)",
    price: 3500,
    category: "Raw Foods",
    image: "🥔",
  },
  {
    id: 138,
    name: "Cassava (5kg)",
    price: 2500,
    category: "Raw Foods",
    image: "🥔",
  },
  {
    id: 139,
    name: "Plantains (5kg)",
    price: 2200,
    category: "Raw Foods",
    image: "🍌",
  },
  {
    id: 140,
    name: "Peppers (1kg)",
    price: 1800,
    category: "Raw Foods",
    image: "🌶️",
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { cart, addToCart, removeFromCart, updateQuantity, checkout } =
    useCart();
  const { isThriftUser, contributions, recordPayment, hasSufficientFunds } =
    useAuth();

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
  ];
  const filteredProducts = PRODUCTS.filter((p) => {
    const catMatch =
      selectedCategory === "All" || p.category === selectedCategory;
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return catMatch && searchMatch;
  });

  const cartTotal = (cart || []).reduce(
    (s, it) => s + it.price * it.quantity,
    0
  );

  const handlePaystackCheckout = () => {
    if (cartTotal === 0) {
      alert("Cart is empty");
      return;
    }

    // Get user email from localStorage or use default
    const userEmail =
      localStorage.getItem("userEmail") || "customer@example.com";
    const paystackKey = "pk_test_your_paystack_key"; // Replace with your actual Paystack public key

    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      alert("Payment gateway is loading. Please try again in a moment.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email: userEmail,
      amount: cartTotal * 100, // Paystack amount in kobo
      ref: "" + Math.floor(Math.random() * 1000000000) + 1,
      onClose: function () {
        alert("Payment window closed.");
      },
      onSuccess: function (response) {
        alert("Payment successful! Reference: " + response.reference);
        // Clear cart after successful payment
        checkout();
        // Here you can add logic to save the order, send email confirmation, etc.
      },
    });

    handler.openIframe();
  };

  function TopUpForm({ onTopUp }) {
    const [amt, setAmt] = useState("");
    return (
      <div className="flex gap-2">
        <input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          className="w-full rounded px-2 py-1 border"
          placeholder="Amount"
        />
        <button
          onClick={() => {
            const n = Number(amt);
            if (!n || n <= 0) return alert("Enter a valid amount");
            onTopUp(n);
            setAmt("");
          }}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Add
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-amber-300">
            RubiesThrift Marketplace
          </h1>
          <div className="mt-4 max-w-md">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-teal-200" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded w-full text-gray-900"
                placeholder="Search products..."
              />
            </div>
          </div>
        </div>
      </div>

      <MarketplaceBanner />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="w-1/4">
            <div className="bg-white text-gray-900 p-4 rounded shadow border-t-4 border-teal-600">
              <h3 className="font-bold mb-2 text-teal-900">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      selectedCategory === cat
                        ? "block w-full text-left px-3 py-2 bg-teal-600 text-white rounded"
                        : "block w-full text-left px-3 py-2 rounded"
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white text-gray-900 p-4 rounded shadow border-t-4 border-emerald-600 mt-4">
              <h3 className="font-bold text-teal-900">Cart</h3>
              <div className="mt-2 text-sm text-teal-700">
                Wallet: ₦{(contributions || 0).toLocaleString()}
              </div>
              <div className="mt-2">
                <TopUpForm
                  onTopUp={(amt) => {
                    const next = recordPayment(amt);
                    alert(
                      `Wallet topped up. New balance: ₦${next.toLocaleString()}`
                    );
                  }}
                />
              </div>
              <div className="mt-3">
                {(cart || []).length === 0 ? (
                  <p className="text-gray-500">Cart is empty</p>
                ) : (
                  <>
                    {(cart || []).map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <div className="font-semibold">{it.name}</div>
                          <div className="text-xs text-gray-600">
                            ₦{it.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity - 1)
                            }
                            className="px-2"
                          >
                            −
                          </button>
                          <div>{it.quantity}</div>
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity + 1)
                            }
                            className="px-2"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(it.id)}
                            className="text-red-500"
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-2 flex justify-between items-center">
                      <div className="font-bold">Total</div>
                      <div className="font-bold text-teal-700">
                        ₦{cartTotal.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={handlePaystackCheckout}
                      className="mt-3 w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 rounded hover:from-teal-700 hover:to-emerald-700 font-semibold"
                    >
                      Checkout with Paystack
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white text-gray-900 rounded shadow p-4 border border-gray-200 hover:shadow-lg hover:border-teal-300 transition"
                >
                  <div className="text-6xl text-center">{p.image}</div>
                  <h3 className="font-bold mt-2">{p.name}</h3>
                  <div className="text-sm text-gray-600">{p.category}</div>
                  <div className="mt-2 font-bold text-teal-600">
                    ₦{p.price.toLocaleString()}
                  </div>
                  <div className="mt-3">
                    {!isThriftUser ? (
                      <button
                        disabled
                        className="w-full py-2 bg-gray-300 rounded text-white"
                      >
                        Sign up to add
                      </button>
                    ) : hasSufficientFunds(p.price) ? (
                      <button
                        onClick={() => addToCart(p)}
                        className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => alert("Top up to add this item")}
                        className="w-full py-2 bg-amber-500 text-teal-900 rounded hover:bg-amber-400 font-semibold"
                      >
                        Top up
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto text-center text-amber-300 font-semibold">
          RubiesThrift Marketplace
        </div>
      </div>
    </div>
  );
}
