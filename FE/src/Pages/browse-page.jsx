import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Search } from "lucide-react"
import ProductCard from "../Components/reuserbleProductCard/ProductCard"
import { CATEGORIES, OPTIONS } from "../utils/productsGroupings";

const Browse = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [wishlist, setWishlist] = useState([])
  const { category,type,btype } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;

  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search)
  const [filters, setFilters] = useState({
    lookingFor: queryParams.get("lookingFor") || "",
    location: queryParams.get("location") || "",
    propertyType: queryParams.get("propertyType") || "",
    propertySize: queryParams.get("propertySize") || "",
    budget: queryParams.get("budget") || "",
  })
  // Fetch search results when component mounts or URL changes
  useEffect(() => {
    if(btype && btype == 'type'){
      let categoryData  = CATEGORIES.find((cat) => cat.id === category),
      typeData;
      if(categoryData){
        typeData = OPTIONS[categoryData.name]?.find((t) => t.id === type)
        if(typeData){
          fetchSearchResults(btype,categoryData,typeData)
        }
        console.log(categoryData, typeData);
      }
    }else if(btype && btype == 'availability'){
      fetchSearchResults(btype, category.replace(/-/g, ' '), null)
    }
    fetchWishlist()
  }, [category,type,btype])

  const fetchWishlist = async () => {
    // This would typically fetch the user's wishlist from your API
    // For now, we'll just use an empty array
    setWishlist([])
  }

  const fetchSearchResults = async (btype,categoryData,typeData) => {
    setIsLoading(true)
    try {
      let options = {
        method: "post",
        credentials: "include", // Include cookies for authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          btype,
          categoryData,
          typeData: typeData ? typeData : null,
        }),
      }
      const response = await fetch(`${API_URL}/api/product/browse?${new URLSearchParams(location.search)}`,options)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error searching properties:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()

    // Build query string from the filters
    const queryParams = new URLSearchParams()
    if (filters.lookingFor) queryParams.append("lookingFor", filters.lookingFor)
    if (filters.location) queryParams.append("location", filters.location)
    if (filters.propertyType) queryParams.append("propertyType", filters.propertyType)
    if (filters.propertySize) queryParams.append("propertySize", filters.propertySize)
    if (filters.budget) queryParams.append("budget", filters.budget)

    // Navigate to search page with query parameters
    navigate(`/search?${queryParams.toString()}`)
  }

  const handleToggleWishlist = async (productId) => {
    // This would typically call your API to toggle the wishlist status
    console.log("Toggle wishlist for product:", productId)

    // For demo purposes, we'll just toggle it locally
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Search Form Section */}
        <div className="bg-white shadow-md py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Explore Our Wide Range of Products and Services</h1>
            <p className="text-gray-600 mb-4">Use the filters below to narrow down your search and find the perfect match for your needs.</p>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">Availability</label>
            <select
              className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
              value={filters.lookingFor}
              onChange={(e) => setFilters({ ...filters, lookingFor: e.target.value })}
            >
              <option value="">Choose</option>
              <option value="Available">Available</option>
              <option value="For Sale">Buy</option>
              <option value="Rental">Rent</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">Property Type</label>
            <select
              className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="House">House</option>
              <option value="Office">Office</option>
              <option value="Land">Land</option>
              <option value="Apartment/Condo">Apartment</option>
              <option value="Commercial Space">Commercial</option>
              <option value="Industrial Property">Industrial Property</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">Property Size</label>
            <input
              type="text"
              placeholder="Any size"
              className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
              value={filters.propertySize}
              onChange={(e) => setFilters({ ...filters, propertySize: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">Budget</label>
            <input
              type="text"
              placeholder="Enter budget"
              className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
              value={filters.budget}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-700 font-medium">&nbsp;</label>
            <button
              type="submit"
              className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
            </form>
          </div>
        </div>

        {/* Results Section */}
      <div className="container mx-auto px-4 mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{results.length} Entries Found</h2>
              <div className="flex gap-2">
                <select className="p-2 border rounded-md border-gray-300 text-gray-800">
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((property) => (
                  <ProductCard
                    key={property._id}
                    product={property}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.includes(property._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria to find more properties.</p>
                <img src="/no-result.png" alt="No results" className="max-w-xs mx-auto opacity-50" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Browse

