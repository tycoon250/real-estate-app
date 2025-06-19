
import { Link } from "react-router-dom";
import carImage from "../../Assets/eee99.png";
// Static category and subcategory data
const CATEGORIES = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Sports & Outdoors",
    "Baby & Kids",
    "Groceries & Food",
    "Books & Stationery",
    "Automotive",
    "Pets Supplies",
    "Tools & Hardware",
    "Gifts & Special Occasions",
  ];
  let OPTIONS
  const TYPES = CATEGORIES.map((category,index) => {
     OPTIONS = {
      Electronics: [
        { image: carImage, id: "mobile-phones", label: "Mobile Phones & Accessories", href: "/electronics/mobile-phones" },
        { image: carImage, id: "computers", label: "Computers & Tablets", href: "/electronics/computers" },
        { image: carImage, id: "tvs-audio", label: "TVs & Audio", href: "/electronics/tvs-audio" },
        { image: carImage, id: "cameras-drones", label: "Cameras & Drones", href: "/electronics/cameras-drones" },
        { image: carImage, id: "gaming-consoles", label: "Gaming Consoles", href: "/electronics/gaming-consoles" },
      ],
      Fashion: [
        { image: carImage, id: "mens-clothing", label: "Men’s Clothing", href: "/fashion/mens-clothing" },
        { image: carImage, id: "womens-clothing", label: "Women’s Clothing", href: "/fashion/womens-clothing" },
        { image: carImage, id: "kids-clothing", label: "Kids' Clothing", href: "/fashion/kids-clothing" },
        { image: carImage, id: "shoes-footwear", label: "Shoes & Footwear", href: "/fashion/shoes-footwear" },
        { image: carImage, id: "bags-accessories", label: "Bags & Accessories", href: "/fashion/bags-accessories" },
        { image: carImage, id: "jewelry-watches", label: "Jewelry & Watches", href: "/fashion/jewelry-watches" },
      ],
      "Home & Living": [
        { image: carImage, id: "furniture", label: "Furniture", href: "/home-living/furniture" },
        { image: carImage, id: "home-decor", label: "Home Décor", href: "/home-living/home-decor" },
        { image: carImage, id: "kitchenware", label: "Kitchenware", href: "/home-living/kitchenware" },
        { image: carImage, id: "bedding-linen", label: "Bedding & Linen", href: "/home-living/bedding-linen" },
        { image: carImage, id: "lighting", label: "Lighting", href: "/home-living/lighting" },
      ],
      "Beauty & Personal Care": [
        { image: carImage, id: "skincare", label: "Skincare", href: "/beauty/skincare" },
        { image: carImage, id: "makeup", label: "Makeup", href: "/beauty/makeup" },
        { image: carImage, id: "hair-care", label: "Hair Care", href: "/beauty/hair-care" },
        { image: carImage, id: "fragrances", label: "Fragrances", href: "/beauty/fragrances" },
        { image: carImage, id: "mens-grooming", label: "Men's Grooming", href: "/beauty/mens-grooming" },
      ],
      "Health & Wellness": [
        { image: carImage, id: "supplements", label: "Supplements & Vitamins", href: "/health/supplements" },
        { image: carImage, id: "fitness-equipment", label: "Fitness Equipment", href: "/health/fitness-equipment" },
        { image: carImage, id: "medical-supplies", label: "Medical Supplies", href: "/health/medical-supplies" },
        { image: carImage, id: "ppe", label: "Personal Protective Equipment", href: "/health/ppe" },
      ],
      "Sports & Outdoors": [
        { image: carImage, id: "fitness-equipment", label: "Fitness Equipment", href: "/sports/fitness-equipment" },
        { image: carImage, id: "outdoor-gear", label: "Outdoor Gear", href: "/sports/outdoor-gear" },
        { image: carImage, id: "bicycles", label: "Bicycles & Accessories", href: "/sports/bicycles" },
        { image: carImage, id: "camping-hiking", label: "Camping & Hiking", href: "/sports/camping-hiking" },
      ],
      "Baby & Kids": [
        { image: carImage, id: "baby-clothing", label: "Baby Clothing", href: "/baby-kids/baby-clothing" },
        { image: carImage, id: "toys-games", label: "Toys & Games", href: "/baby-kids/toys-games" },
        { image: carImage, id: "baby-gear", label: "Baby Gear (Strollers, Car Seats)", href: "/baby-kids/baby-gear" },
        { image: carImage, id: "school-supplies", label: "School Supplies", href: "/baby-kids/school-supplies" },
      ],
      "Groceries & Food": [
        { image: carImage, id: "fresh-produce", label: "Fresh Produce", href: "/groceries/fresh-produce" },
        { image: carImage, id: "snacks-beverages", label: "Snacks & Beverages", href: "/groceries/snacks-beverages" },
        { image: carImage, id: "health-foods", label: "Health Foods", href: "/groceries/health-foods" },
        { image: carImage, id: "organic-products", label: "Organic Products", href: "/groceries/organic-products" },
      ],
      "Books & Stationery": [
        { image: carImage, id: "fiction", label: "Fiction & Non-Fiction", href: "/books/fiction" },
        { image: carImage, id: "academic-books", label: "Academic Books", href: "/books/academic-books" },
        { image: carImage, id: "office-supplies", label: "Office Supplies", href: "/books/office-supplies" },
        { image: carImage, id: "art-supplies", label: "Art Supplies", href: "/books/art-supplies" },
      ],
      Automotive: [
        { image: carImage, id: "car-accessories", label: "Car Accessories", href: "/automotive/car-accessories" },
        { image: carImage, id: "motorbike-accessories", label: "Motorbike Accessories", href: "/automotive/motorbike-accessories" },
        { image: carImage, id: "tools-equipment", label: "Tools & Equipment", href: "/automotive/tools-equipment" },
        { image: carImage, id: "vehicle-electronics", label: "Vehicle Electronics", href: "/automotive/vehicle-electronics" },
      ],
      "Pets Supplies": [
        { image: carImage, id: "pet-food", label: "Pet Food", href: "/pets/pet-food" },
        { image: carImage, id: "toys-accessories", label: "Toys & Accessories", href: "/pets/toys-accessories" },
        { image: carImage, id: "pet-care-products", label: "Pet Care Products", href: "/pets/pet-care-products" },
      ],
      "Tools & Hardware": [
        { image: carImage, id: "power-tools", label: "Power Tools", href: "/tools/power-tools" },
        { image: carImage, id: "hand-tools", label: "Hand Tools", href: "/tools/hand-tools" },
        { image: carImage, id: "building-materials", label: "Building Materials", href: "/tools/building-materials" },
        { image: carImage, id: "electrical-equipment", label: "Electrical Equipment", href: "/tools/electrical-equipment" },
      ],
      "Gifts & Special Occasions": [
        { image: carImage, id: "gift-cards", label: "Gift Cards", href: "/gifts/gift-cards" },
        { image: carImage, id: "seasonal-items", label: "Seasonal Items (e.g. Christmas, Valentine's Day)", href: "/gifts/seasonal-items" },
        { image: carImage, id: "personalized-gifts", label: "Personalized Gifts", href: "/gifts/personalized-gifts" },
      ],
    };
    return { category, children: OPTIONS[category], id : index || [] };
  });

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export const CategoryShowcase = () => {
  const shuffled = [...CATEGORIES].sort(() => 0.5 - Math.random());

  const blocks = [];
  let i = 0;
  while (i < shuffled.length) {
    const count = Math.floor(Math.random() * 4) + 1; // 1-4 blocks per row
    blocks.push(shuffled.slice(i, i + count));
    i += count;
  }

  return (
    <div className="px-4 py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {blocks.map((group, rowIndex) => {
          const colCount = group.length;
          const width = 100 / colCount + "%";
          const imgSize = colCount <= 2 ? "h-36" : "h-24"; // larger images for fewer blocks

          return (
            <div key={rowIndex} className="flex w-full gap-4">
              {group.map((category) => {
                const items = OPTIONS[category] || [];

                return (
                  <div
                    key={category}
                    className="bg-white rounded shadow p-4"
                    style={{ width }}
                  >
                    <h3 className="text-lg font-semibold mb-4">{category}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {items.map((item) => (
                        <Link
                          key={item.id}
                          to={item.href}
                          className="block text-center"
                        >
                          <img
                            src={item.image}
                            alt={item.label}
                            className={`w-full object-cover rounded ${imgSize}`}
                          />
                          <span className="block mt-2 text-sm text-gray-700">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={items[0]?.href || "#"}
                      className="text-sm text-blue-600 font-medium hover:underline"
                    >
                      Shop now
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
