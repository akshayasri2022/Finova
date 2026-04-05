
export const categoryIcon = (cat) => {
  const icons = {
    Food:          "Utensils",
    Entertainment: "Tv",
    Utilities:     "Zap",
    Health:        "HeartPulse",
    Shopping:      "ShoppingBag",
    Transport:     "Car",
    Housing:       "Home",
  };
  return icons[cat] || "Bookmark";
};


export const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtFull = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(n);

