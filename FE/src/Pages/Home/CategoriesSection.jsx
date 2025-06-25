
import { Link } from "react-router-dom";
import carImage from "../../Assets/eee99.png";
import Accessories from "../../Assets/Accessories.png";
import Laptop from "../../Assets/Laptop.jpg";
import Audio  from "../../Assets/Audio.jpg";
import Cameras from "../../Assets/Cameras.jpg";
import consoles from "../../Assets/consoles.jpg";
import clothing from "../../Assets/clothing.jpg";
import womens from "../../Assets/womens.png";
import kids from "../../Assets/kids.jpg";
import footwear from "../../Assets/footwear.jpg";
import bags from "../../Assets/bags.jpg";
import gurgenidze from "../../Assets/gurgenidze.jpg";
import furniture from "../../Assets/furniture.JPG";
import homedecor from "../../Assets/homedecor.jpg";
import kitchenware from "../../Assets/kitchenware.jpg";
import bedding from "../../Assets/bedding.jpg";
import lighting from "../../Assets/lighting.jpg";
import skincare from "../../Assets/skincare.jpg";
import makeup from "../../Assets/makeup.jpg";
import haircare from "../../Assets/haircare.jpg";
import fragrances from "../../Assets/fragrances.jpg";
import mensgrooming from "../../Assets/mensgrooming.jpeg";
import Supplements from "../../Assets/Supplements.jpg";
import Health from "../../Assets/Health.jpg";
import fitness from "../../Assets/fitness.jpg";
 import medical from "../../Assets/medical.jpg";
 import Personal from "../../Assets/Personal.jpg";
 import outdoor from "../../Assets/outdoor.jpg";
 import Bicycles from "../../Assets/Bicycles.jpg";
 import baby from "../../Assets/baby.jpg";
 import toys from "../../Assets/toys.jpg";
 import babygear from "../../Assets/babygear.avif";
 import Camping from "../../Assets/Camping.webp";
 import School from "../../Assets/School.webp";
 import FreshProduce from "../../Assets/FreshProduce.jpg";
 import SnacksBeverages from "../../Assets/SnacksBeverages.jpg";
 import HealthFoods from "../../Assets/HealthFoods.jpg";
 import NonFiction from "../../Assets/NonFiction.jpg";
 import OrganicProducts from "../../Assets/OrganicProducts.jpg";
 import AcademicBook from "../../Assets/AcademicBook.jpg";
 import OfficeSupplies from "../../Assets/OfficeSupplies.jpg";
 import ArtSupplies from "../../Assets/ArtSupplies.webp";
 import CarAccessories from "../../Assets/CarAccessories.jpg";
 import motorbikeaccessories from "../../Assets/motorbikeaccessories.jpg";
 import Equipment from "../../Assets/Equipment.jpg";
 import PetFood from "../../Assets/PetFood.jpg";
 import ToysAccessories from "../../Assets/ToysAccessories.webp";
 import CareProduct   from "../../Assets/CareProduct.jpg";
 import PowerTools from "../../Assets/PowerTools.webp";
 import HandTools from "../../Assets/HandTools.jpg";
 import BuildingMaterials from "../../Assets/BuildingMaterials.jpg";
 import ElectricalEquipment from "../../Assets/ElectricalEquipment.jpg";
 import GiftCards from "../../Assets/GiftCards.jpg";
 import SeasonalItems from "../../Assets/SeasonalItems.webp";
 import Personalized  from "../../Assets/Personalized.jpg";
 import Plotsale from "../../Assets/Plotsale.jpg";
 import UseCar from "../../Assets/UseCar.jpg";
 import Others from "../../Assets/Others.jpg";

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
    "Plot & Used Materials",

  ];
  let OPTIONS
  const TYPES = CATEGORIES.map((category,index) => {
     OPTIONS = {
      Electronics: [
        { image: Accessories, id: "mobile-phones", label: "Mobile Phones & Accessories", href: "/electronics/mobile-phones" },
        { image: Laptop, id: "computers", label: "Computers & Tablets", href: "/electronics/computers" },
        { image: Audio, id: "tvs-audio", label: "TVs & Audio", href: "/electronics/tvs-audio" },
        { image: Cameras, id: "cameras-drones", label: "Cameras & Drones", href: "/electronics/cameras-drones" },
        { image: consoles, id: "gaming-consoles", label: "Gaming Consoles", href: "/electronics/gaming-consoles" },
      ],
      Fashion: [
        { image: clothing, id: "mens-clothing", label: "Men’s Clothing", href: "/fashion/mens-clothing" },
        { image: womens, id: "womens-clothing", label: "Women’s Clothing", href: "/fashion/womens-clothing" },
        { image: kids, id: "kids-clothing", label: "Kids' Clothing", href: "/fashion/kids-clothing" },
        { image: footwear, id: "shoes-footwear", label: "Shoes & Footwear", href: "/fashion/shoes-footwear" },
        { image: bags, id: "bags-accessories", label: "Bags & Accessories", href: "/fashion/bags-accessories" },
        { image: gurgenidze, id: "jewelry-watches", label: "Jewelry & Watches", href: "/fashion/jewelry-watches" },
      ],
      "Home & Living": [
        { image: furniture, id: "furniture", label: "Furniture", href: "/home-living/furniture" },
        { image: homedecor, id: "home-decor", label: "Home Décor", href: "/home-living/home-decor" },
        { image: kitchenware, id: "kitchenware", label: "Kitchenware", href: "/home-living/kitchenware" },
        { image: bedding, id: "bedding-linen", label: "Bedding & Linen", href: "/home-living/bedding-linen" },
        { image: lighting, id: "lighting", label: "Lighting", href: "/home-living/lighting" },
      ],
      "Beauty & Personal Care": [
        { image: skincare, id: "skincare", label: "Skincare", href: "/beauty/skincare" },
        { image: makeup, id: "makeup", label: "Makeup", href: "/beauty/makeup" },
        { image: haircare, id: "hair-care", label: "Hair Care", href: "/beauty/hair-care" },
        { image: fragrances, id: "fragrances", label: "Fragrances", href: "/beauty/fragrances" },
        { image: mensgrooming, id: "mens-grooming", label: "Men's Grooming", href: "/beauty/mens-grooming" },
      ],
      "Health & Wellness": [
        { image: Supplements, id: "supplements", label: "Supplements & Vitamins", href: "/health/supplements" },
        { image: Health, id: "fitness-equipment", label: "Fitness Equipment", href: "/health/fitness-equipment" },
        { image: medical, id: "medical-supplies", label: "Medical Supplies", href: "/health/medical-supplies" },
        { image: Personal, id: "ppe", label: "Personal Protective Equipment", href: "/health/ppe" },
      ],
      "Sports & Outdoors": [
        { image: fitness, id: "fitness-equipment", label: "Fitness Equipment", href: "/sports/fitness-equipment" },
        { image: outdoor, id: "outdoor-gear", label: "Outdoor Gear", href: "/sports/outdoor-gear" },
        { image: Bicycles, id: "bicycles", label: "Bicycles & Accessories", href: "/sports/bicycles" },
        { image: Camping, id: "camping-hiking", label: "Camping & Hiking", href: "/sports/camping-hiking" },
      ],
      "Baby & Kids": [
        { image: baby, id: "baby-clothing", label: "Baby Clothing", href: "/baby-kids/baby-clothing" },
        { image: toys, id: "toys-games", label: "Toys & Games", href: "/baby-kids/toys-games" },
        { image: babygear, id: "baby-gear", label: "Baby Gear (Strollers, Car Seats)", href: "/baby-kids/baby-gear" },
        { image: School, id: "school-supplies", label: "School Supplies", href: "/baby-kids/school-supplies" },
      ],
      "Groceries & Food": [
        { image: FreshProduce, id: "fresh-produce", label: "Fresh Produce", href: "/groceries/fresh-produce" },
        { image: SnacksBeverages, id: "snacks-beverages", label: "Snacks & Beverages", href: "/groceries/snacks-beverages" },
        { image: HealthFoods, id: "health-foods", label: "Health Foods", href: "/groceries/health-foods" },
        { image: OrganicProducts, id: "organic-products", label: "Organic Products", href: "/groceries/organic-products" },
      ],
      "Books & Stationery": [
        { image: NonFiction, id: "fiction", label: "Fiction & Non-Fiction", href: "/books/fiction" },
        { image: AcademicBook, id: "academic-books", label: "Academic Books", href: "/books/academic-books" },
        { image: OfficeSupplies, id: "office-supplies", label: "Office Supplies", href: "/books/office-supplies" },
        { image: ArtSupplies, id: "art-supplies", label: "Art Supplies", href: "/books/art-supplies" },
      ],
      Automotive: [
        { image: CarAccessories, id: "car-accessories", label: "Car Accessories", href: "/automotive/car-accessories" },
        { image: motorbikeaccessories, id: "motorbike-accessories", label: "Motorbike Accessories", href: "/automotive/motorbike-accessories" },
        { image: Equipment, id: "tools-equipment", label: "Tools & Equipment", href: "/automotive/tools-equipment" },
        { image: carImage, id: "vehicle-electronics", label: "Vehicle Electronics", href: "/automotive/vehicle-electronics" },
      ],
      "Pets Supplies": [
        { image: PetFood, id: "pet-food", label: "Pet Food", href: "/pets/pet-food" },
        { image: ToysAccessories, id: "toys-accessories", label: "Toys & Accessories", href: "/pets/toys-accessories" },
        { image: CareProduct, id: "pet-care-products", label: "pet care products", href: "/pets/pet-care-products" },
      ],
      "Tools & Hardware": [
        { image: PowerTools, id: "power-tools", label: "Power Tools", href: "/tools/power-tools" },
        { image: HandTools, id: "hand-tools", label: "Hand Tools", href: "/tools/hand-tools" },
        { image: BuildingMaterials, id: "building-materials", label: "Building Materials", href: "/tools/building-materials" },
        { image: ElectricalEquipment, id: "electrical-equipment", label: "Electrical Equipment", href: "/tools/electrical-equipment" },
      ],
      "Gifts & Special Occasions": [
        { image: GiftCards, id: "gift-cards", label: "Gift Cards", href: "/gifts/gift-cards" },
        { image: SeasonalItems, id: "seasonal-items", label: "Seasonal Items (e.g. Christmas, Valentine's Day)", href: "/gifts/seasonal-items" },
        { image: Personalized , id: "personalized-gifts", label: "Personalized Gifts", href: "/gifts/personalized-gifts" },
      ],
      "Plot & Used Materials": [
        { image: Plotsale, id: "plot-sale", label: "Plots for Sale", href: "/plot" },
        { image: UseCar, id: "used-car", label: "Used car ", href: "/car/motobike" },
        { image: Others , id: "other-thing", label: "Other Things for Sale", href: "/gifts/All Materials" },
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
                      className="bg-orange-100 hover:bg-green-800 text-dack font-semibold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-300"
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
