import carImage from "../Assets/cars.jpeg";
import Accessories from "../Assets/Accessories.png";
import Laptop from "../Assets/Laptop.jpg";
import Audio  from "../Assets/Audio.jpg";
import Cameras from "../Assets/Cameras.jpg";
import consoles from "../Assets/consoles.jpg";
import clothing from "../Assets/clothing.jpg";
import womens from "../Assets/womens.png";
import kids from "../Assets/kids.jpg";
import footwear from "../Assets/footwear.jpg";
import bags from "../Assets/bags.jpg";
import gurgenidze from "../Assets/gurgenidze.jpg";
import furniture from "../Assets/furniture.JPG";
import homedecor from "../Assets/homedecor.jpg";
import kitchenware from "../Assets/kitchenware.jpg";
import bedding from "../Assets/bedding.jpg";
import lighting from "../Assets/lighting.jpg";
import skincare from "../Assets/skincare.jpg";
import makeup from "../Assets/makeup.jpg";
import haircare from "../Assets/haircare.jpg";
import fragrances from "../Assets/fragrances.jpg";
import mensgrooming from "../Assets/mensgrooming.jpeg";
import Supplements from "../Assets/Supplements.jpg";
import Health from "../Assets/Health.jpg";
import fitness from "../Assets/fitness.jpg";
import medical from "../Assets/medical.jpg";
import Personal from "../Assets/Personal.jpg";
import outdoor from "../Assets/outdoor.jpg";
import Bicycles from "../Assets/Bicycles.jpg";
import baby from "../Assets/baby.jpg";
import toys from "../Assets/toys.jpg";
import babygear from "../Assets/babygear.avif";
import Camping from "../Assets/Camping.webp";
import School from "../Assets/School.webp";
import FreshProduce from "../Assets/FreshProduce.jpg";
import SnacksBeverages from "../Assets/SnacksBeverages.jpg";
import HealthFoods from "../Assets/HealthFoods.jpg";
import NonFiction from "../Assets/NonFiction.jpg";
import OrganicProducts from "../Assets/OrganicProducts.jpg";
import AcademicBook from "../Assets/AcademicBook.jpg";
import OfficeSupplies from "../Assets/OfficeSupplies.jpg";
import ArtSupplies from "../Assets/ArtSupplies.webp";
import CarAccessories from "../Assets/CarAccessories.jpg";
import motorbikeaccessories from "../Assets/motorbikeaccessories.jpg";
import Equipment from "../Assets/Equipment.jpg";
import PetFood from "../Assets/PetFood.jpg";
import ToysAccessories from "../Assets/ToysAccessories.webp";
import CareProduct from "../Assets/CareProduct.jpg";
import PowerTools from "../Assets/PowerTools.webp";
import HandTools from "../Assets/HandTools.jpg";
import BuildingMaterials from "../Assets/BuildingMaterials.jpg";
import ElectricalEquipment from "../Assets/ElectricalEquipment.jpg";
import GiftCards from "../Assets/GiftCards.jpg";
import SeasonalItems from "../Assets/SeasonalItems.webp";
import Personalized from "../Assets/Personalized.jpg";
import Plotsale from "../Assets/Plotsale.jpg";
import UseCar from "../Assets/UseCar.jpg";
import Others from "../Assets/Others.jpg";
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
      { image: Accessories, id: "mobile-phones", label: "Mobile Phones & Accessories", href: "/browse/type/electronics/mobile-phones" },
      { image: Laptop, id: "computers", label: "Computers & Tablets", href: "/browse/type/electronics/computers" },
      { image: Audio, id: "tvs-audio", label: "TVs & Audio", href: "/browse/type/electronics/tvs-audio" },
      { image: Cameras, id: "cameras-drones", label: "Cameras & Drones", href: "/browse/type/electronics/cameras-drones" },
      { image: consoles, id: "gaming-consoles", label: "Gaming Consoles", href: "/browse/type/electronics/gaming-consoles" },
    ],
    Fashion: [
      { image: clothing, id: "mens-clothing", label: "Men’s Clothing", href: "/browse/type/fashion/mens-clothing" },
      { image: womens, id: "womens-clothing", label: "Women’s Clothing", href: "/browse/type/fashion/womens-clothing" },
      { image: kids, id: "kids-clothing", label: "Kids' Clothing", href: "/browse/type/fashion/kids-clothing" },
      { image: footwear, id: "shoes-footwear", label: "Shoes & Footwear", href: "/browse/type/fashion/shoes-footwear" },
      { image: bags, id: "bags-accessories", label: "Bags & Accessories", href: "/browse/type/fashion/bags-accessories" },
      { image: gurgenidze, id: "jewelry-watches", label: "Jewelry & Watches", href: "/browse/type/fashion/jewelry-watches" },
    ],
    "Home & Living": [
      { image: furniture, id: "furniture", label: "Furniture", href: "/browse/type/home-living/furniture" },
      { image: homedecor, id: "home-decor", label: "Home Décor", href: "/browse/type/home-living/home-decor" },
      { image: kitchenware, id: "kitchenware", label: "Kitchenware", href: "/browse/type/home-living/kitchenware" },
      { image: bedding, id: "bedding-linen", label: "Bedding & Linen", href: "/browse/type/home-living/bedding-linen" },
      { image: lighting, id: "lighting", label: "Lighting", href: "/browse/type/home-living/lighting" },
    ],
    "Beauty & Personal Care": [
      { image: skincare, id: "skincare", label: "Skincare", href: "/browse/type/beauty-personal-care/skincare" },
      { image: makeup, id: "makeup", label: "Makeup", href: "/browse/type/beauty-personal-care/makeup" },
      { image: haircare, id: "hair-care", label: "Hair Care", href: "/browse/type/beauty-personal-care/hair-care" },
      { image: fragrances, id: "fragrances", label: "Fragrances", href: "/browse/type/beauty-personal-care/fragrances" },
      { image: mensgrooming, id: "mens-grooming", label: "Men's Grooming", href: "/browse/type/beauty-personal-care/mens-grooming" },
    ],
    "Health & Wellness": [
      { image: Supplements, id: "supplements", label: "Supplements & Vitamins", href: "/browse/type/health-wellness/supplements" },
      { image: Health, id: "fitness-equipment", label: "Fitness Equipment", href: "/browse/type/health-wellness/fitness-equipment" },
      { image: medical, id: "medical-supplies", label: "Medical Supplies", href: "/browse/type/health-wellness/medical-supplies" },
      { image: Personal, id: "ppe", label: "Personal Protective Equipment", href: "/browse/type/health-wellness/ppe" },
    ],
    "Sports & Outdoors": [
      { image: fitness, id: "fitness-equipment", label: "Fitness Equipment", href: "/browse/type/sports-outdoors/fitness-equipment" },
      { image: outdoor, id: "outdoor-gear", label: "Outdoor Gear", href: "/browse/type/sports-outdoors/outdoor-gear" },
      { image: Bicycles, id: "bicycles", label: "Bicycles & Accessories", href: "/browse/type/sports-outdoors/bicycles" },
      { image: Camping, id: "camping-hiking", label: "Camping & Hiking", href: "/browse/type/sports-outdoors/camping-hiking" },
    ],
    "Baby & Kids": [
      { image: baby, id: "baby-clothing", label: "Baby Clothing", href: "/browse/type/baby-kids/baby-clothing" },
      { image: toys, id: "toys-games", label: "Toys & Games", href: "/browse/type/baby-kids/toys-games" },
      { image: babygear, id: "baby-gear", label: "Baby Gear (Strollers, Car Seats)", href: "/browse/type/baby-kids/baby-gear" },
      { image: School, id: "school-supplies", label: "School Supplies", href: "/browse/type/baby-kids/school-supplies" },
    ],
    "Groceries & Food": [
      { image: FreshProduce, id: "fresh-produce", label: "Fresh Produce", href: "/browse/type/groceries-food/fresh-produce" },
      { image: SnacksBeverages, id: "snacks-beverages", label: "Snacks & Beverages", href: "/browse/type/groceries-food/snacks-beverages" },
      { image: HealthFoods, id: "health-foods", label: "Health Foods", href: "/browse/type/groceries-food/health-foods" },
      { image: OrganicProducts, id: "organic-products", label: "Organic Products", href: "/browse/type/groceries-food/organic-products" },
    ],
    "Books & Stationery": [
      { image: NonFiction, id: "fiction", label: "Fiction & Non-Fiction", href: "/browse/type/books-stationery/fiction" },
      { image: AcademicBook, id: "academic-books", label: "Academic Books", href: "/browse/type/books-stationery/academic-books" },
      { image: OfficeSupplies, id: "office-supplies", label: "Office Supplies", href: "/browse/type/books-stationery/office-supplies" },
      { image: ArtSupplies, id: "art-supplies", label: "Art Supplies", href: "/browse/type/books-stationery/art-supplies" },
    ],
    Automotive: [
      { image: CarAccessories, id: "car-accessories", label: "Car Accessories", href: "/browse/type/automotive/car-accessories" },
      { image: motorbikeaccessories, id: "motorbike-accessories", label: "Motorbike Accessories", href: "/browse/type/automotive/motorbike-accessories" },
      { image: Equipment, id: "tools-equipment", label: "Tools & Equipment", href: "/browse/type/automotive/tools-equipment" },
      { image: carImage, id: "vehicle-electronics", label: "Vehicle Electronics", href: "/browse/type/automotive/vehicle-electronics" },
    ],
    "Pets Supplies": [
      { image: PetFood, id: "pet-food", label: "Pet Food", href: "/browse/type/pets-supplies/pet-food" },
      { image: ToysAccessories, id: "toys-accessories", label: "Toys & Accessories", href: "/browse/type/pets-supplies/toys-accessories" },
      { image: CareProduct, id: "pet-care-products", label: "pet care products", href: "/browse/type/pets-supplies/pet-care-products" },
    ],
    "Tools & Hardware": [
      { image: PowerTools, id: "power-tools", label: "Power Tools", href: "/browse/type/tools-hardware/power-tools" },
      { image: HandTools, id: "hand-tools", label: "Hand Tools", href: "/browse/type/tools-hardware/hand-tools" },
      { image: BuildingMaterials, id: "building-materials", label: "Building Materials", href: "/browse/type/tools-hardware/building-materials" },
      { image: ElectricalEquipment, id: "electrical-equipment", label: "Electrical Equipment", href: "/browse/type/tools-hardware/electrical-equipment" },
    ],
    "Gifts & Special Occasions": [
      { image: GiftCards, id: "gift-cards", label: "Gift Cards", href: "/browse/type/gifts-special-occasions/gift-cards" },
      { image: SeasonalItems, id: "seasonal-items", label: "Seasonal Items (e.g. Christmas, Valentine's Day)", href: "/browse/type/gifts-special-occasions/seasonal-items" },
      { image: Personalized, id: "personalized-gifts", label: "Personalized Gifts", href: "/browse/type/gifts-special-occasions/personalized-gifts" },
    ],
    "Plot & Used Materials": [
      { image: Plotsale, id: "plot-sale", label: "Plots for Sale", href: "/browse/type/plot-used-materials/plot-sale" },
      { image: UseCar, id: "used-car", label: "Used car ", href: "/browse/type/plot-used-materials/used-car" },
      { image: Others, id: "other-thing", label: "Other Things for Sale", href: "/browse/type/plot-used-materials/other-thing" },
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
  