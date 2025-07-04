import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Filter, Search } from "lucide-react"
import ProductCard from "../Components/reuserbleProductCard/ProductCard"
import { CATEGORIES, OPTIONS, STATUSES } from "../utils/productsGroupings";

const Browse = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [wishlist, setWishlist] = useState([])
  const { category,type,btype } = useParams();
  const [catData,setCatData] = useState({})
  const [typData,setTypeData] = useState({})
  const API_URL = process.env.REACT_APP_API_URL,
  [filters, setFilters] = useState(
    btype === 'type'
      ? {
          category: CATEGORIES.find((cat) => cat.id === category)?.name || "",
          type: OPTIONS[CATEGORIES.find((cat) => cat.id === category)?.name]?.find((t) => t.id === type) || "",
          status: "",
          budget: "",
        }
      : {
        category: "",
        type:  "",
        status: category.replace(/-/g, ' ') || "",
        budget: "",
      }
  )
  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search)
  // Fetch search results when component mounts or URL changes
  useEffect(() => {
    if(btype && btype == 'type'){
      let categoryData  = CATEGORIES.find((cat) => cat.id === category),
      typeData;
      if(categoryData){
        setCatData(categoryData)
        typeData = OPTIONS[categoryData.name]?.find((t) => t.id === type)
        if(typeData){
          fetchSearchResults(btype,categoryData,typeData)
          setTypeData(typeData)
        }else if (!typeData && !type?.length){
          fetchSearchResults(btype,categoryData,{})
        }
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
 
  console.log(filters)
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSearch = (e) => {
    e.preventDefault()

    // Build query string from the filters
    const queryParams = new URLSearchParams()
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
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  >
                    <option value="">Select Type</option>
                    {OPTIONS[filters.category]?.map((type) => (
                      <option key={type.id} value={type.label}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  >
                    <option value="">Select Status</option>
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
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
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
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

