
export const CATEGORIES = [
  { id: "electronics", name: "Electronics", href: "/browse/type/electronics" },
  { id: "fashion", name: "Fashion", href: "/browse/type/fashion" },
  { id: "home-living", name: "Home & Living", href: "/browse/type/home-living" },
  { id: "beauty-personal-care", name: "Beauty & Personal Care", href: "/browse/type/beauty-personal-care" },
  { id: "health-wellness", name: "Health & Wellness", href: "/browse/type/health-wellness" },
  { id: "sports-outdoors", name: "Sports & Outdoors", href: "/browse/type/sports-outdoors" },
  { id: "baby-kids", name: "Baby & Kids", href: "/browse/type/baby-kids" },
  { id: "groceries-food", name: "Groceries & Food", href: "/browse/type/groceries-food" },
  { id: "books-stationery", name: "Books & Stationery", href: "/browse/type/books-stationery" },
  { id: "automotive", name: "Automotive", href: "/browse/type/automotive" },
  { id: "pets-supplies", name: "Pets Supplies", href: "/browse/type/pets-supplies" },
  { id: "tools-hardware", name: "Tools & Hardware", href: "/browse/type/tools-hardware" },
  { id: "gifts-special-occasions", name: "Gifts & Special Occasions", href: "/browse/type/gifts-special-occasions" },
  { id: "plot-used-materials", name: "Plot & Used Materials", href: "/browse/type/plot-used-materials" },
];
export const OPTIONS = {
    Electronics: [
      { id: "mobile-phones", label: "Mobile Phones & Accessories", href: "/browse/type/electronics/mobile-phones" },
      { id: "computers", label: "Computers & Tablets", href: "/browse/type/electronics/computers" },
      { id: "tvs-audio", label: "TVs & Audio", href: "/browse/type/electronics/tvs-audio" },
      { id: "cameras-drones", label: "Cameras & Drones", href: "/browse/type/electronics/cameras-drones" },
      { id: "gaming-consoles", label: "Gaming Consoles", href: "/browse/type/electronics/gaming-consoles" },
    ],
    Fashion: [
      { id: "mens-clothing", label: "Men’s Clothing", href: "/browse/type/fashion/mens-clothing" },
      { id: "womens-clothing", label: "Women’s Clothing", href: "/browse/type/fashion/womens-clothing" },
      { id: "kids-clothing", label: "Kids' Clothing", href: "/browse/type/fashion/kids-clothing" },
      { id: "shoes-footwear", label: "Shoes & Footwear", href: "/browse/type/fashion/shoes-footwear" },
      { id: "bags-accessories", label: "Bags & Accessories", href: "/browse/type/fashion/bags-accessories" },
      { id: "jewelry-watches", label: "Jewelry & Watches", href: "/browse/type/fashion/jewelry-watches" },
    ],
    "Home & Living": [
      { id: "furniture", label: "Furniture", href: "/browse/type/home-living/furniture" },
      { id: "home-decor", label: "Home Décor", href: "/browse/type/home-living/home-decor" },
      { id: "kitchenware", label: "Kitchenware", href: "/browse/type/home-living/kitchenware" },
      { id: "bedding-linen", label: "Bedding & Linen", href: "/browse/type/home-living/bedding-linen" },
      { id: "lighting", label: "Lighting", href: "/browse/type/home-living/lighting" },
    ],
    "Beauty & Personal Care": [
      { id: "skincare", label: "Skincare", href: "/browse/type/beauty-personal-care/skincare" },
      { id: "makeup", label: "Makeup", href: "/browse/type/beauty-personal-care/makeup" },
      { id: "hair-care", label: "Hair Care", href: "/browse/type/beauty-personal-care/hair-care" },
      { id: "fragrances", label: "Fragrances", href: "/browse/type/beauty-personal-care/fragrances" },
      { id: "mens-grooming", label: "Men's Grooming", href: "/browse/type/beauty-personal-care/mens-grooming" },
    ],
    "Health & Wellness": [
      { id: "supplements", label: "Supplements & Vitamins", href: "/browse/type/health-wellness/supplements" },
      { id: "fitness-equipment", label: "Fitness Equipment", href: "/browse/type/health-wellness/fitness-equipment" },
      { id: "medical-supplies", label: "Medical Supplies", href: "/browse/type/health-wellness/medical-supplies" },
      { id: "ppe", label: "Personal Protective Equipment", href: "/browse/type/health-wellness/ppe" },
    ],
    "Sports & Outdoors": [
      { id: "fitness-equipment", label: "Fitness Equipment", href: "/browse/type/sports-outdoors/fitness-equipment" },
      { id: "outdoor-gear", label: "Outdoor Gear", href: "/browse/type/sports-outdoors/outdoor-gear" },
      { id: "bicycles", label: "Bicycles & Accessories", href: "/browse/type/sports-outdoors/bicycles" },
      { id: "camping-hiking", label: "Camping & Hiking", href: "/browse/type/sports-outdoors/camping-hiking" },
    ],
    "Baby & Kids": [
      { id: "baby-clothing", label: "Baby Clothing", href: "/browse/type/baby-kids/baby-clothing" },
      { id: "toys-games", label: "Toys & Games", href: "/browse/type/baby-kids/toys-games" },
      { id: "baby-gear", label: "Baby Gear (Strollers, Car Seats)", href: "/browse/type/baby-kids/baby-gear" },
      { id: "school-supplies", label: "School Supplies", href: "/browse/type/baby-kids/school-supplies" },
    ],
    "Groceries & Food": [
      { id: "fresh-produce", label: "Fresh Produce", href: "/browse/type/groceries-food/fresh-produce" },
      { id: "snacks-beverages", label: "Snacks & Beverages", href: "/browse/type/groceries-food/snacks-beverages" },
      { id: "health-foods", label: "Health Foods", href: "/browse/type/groceries-food/health-foods" },
      { id: "organic-products", label: "Organic Products", href: "/browse/type/groceries-food/organic-products" },
    ],
    "Books & Stationery": [
      { id: "fiction", label: "Fiction & Non-Fiction", href: "/browse/type/books-stationery/fiction" },
      { id: "academic-books", label: "Academic Books", href: "/browse/type/books-stationery/academic-books" },
      { id: "office-supplies", label: "Office Supplies", href: "/browse/type/books-stationery/office-supplies" },
      { id: "art-supplies", label: "Art Supplies", href: "/browse/type/books-stationery/art-supplies" },
    ],
    Automotive: [
      { id: "car-accessories", label: "Car Accessories", href: "/browse/type/automotive/car-accessories" },
      { id: "motorbike-accessories", label: "Motorbike Accessories", href: "/browse/type/automotive/motorbike-accessories" },
      { id: "tools-equipment", label: "Tools & Equipment", href: "/browse/type/automotive/tools-equipment" },
      { id: "vehicle-electronics", label: "Vehicle Electronics", href: "/browse/type/automotive/vehicle-electronics" },
    ],
    "Pets Supplies": [
      { id: "pet-food", label: "Pet Food", href: "/browse/type/pets-supplies/pet-food" },
      { id: "toys-accessories", label: "Toys & Accessories", href: "/browse/type/pets-supplies/toys-accessories" },
      { id: "pet-care-products", label: "pet care products", href: "/browse/type/pets-supplies/pet-care-products" },
    ],
    "Tools & Hardware": [
      { id: "power-tools", label: "Power Tools", href: "/browse/type/tools-hardware/power-tools" },
      { id: "hand-tools", label: "Hand Tools", href: "/browse/type/tools-hardware/hand-tools" },
      { id: "building-materials", label: "Building Materials", href: "/browse/type/tools-hardware/building-materials" },
      { id: "electrical-equipment", label: "Electrical Equipment", href: "/browse/type/tools-hardware/electrical-equipment" },
    ],
    "Gifts & Special Occasions": [
      { id: "gift-cards", label: "Gift Cards", href: "/browse/type/gifts-special-occasions/gift-cards" },
      { id: "seasonal-items", label: "Seasonal Items (e.g. Christmas, Valentine's Day)", href: "/browse/type/gifts-special-occasions/seasonal-items" },
      { id: "personalized-gifts", label: "Personalized Gifts", href: "/browse/type/gifts-special-occasions/personalized-gifts" },
    ],
    "Plot & Used Materials": [
      { id: "plot-sale", label: "Plots for Sale", href: "/browse/type/plot-used-materials/plot-sale" },
      { id: "used-car", label: "Used car ", href: "/browse/type/plot-used-materials/used-car" },
      { id: "other-thing", label: "Other Things for Sale", href: "/browse/type/plot-used-materials/other-thing" },
    ],
};
CATEGORIES.forEach((category) => {
    if (OPTIONS[category.name]) {
        OPTIONS[category.name] = OPTIONS[category.name].map((item) => {
            return {
                ...item,
                href: `/browse/type/${category.id}/${item.id}`,
            };
        })
    }
})
export const STATUSES = [
  "For Buy",
  "For Rent",
];
  