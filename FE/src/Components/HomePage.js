import { useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import housevia from "../Assets/housevia.png"

const HomePage = () => {
  const [filters, setFilters] = useState({
    lookingFor: "",
    location: "",
    propertyType: "",
    propertySize: "",
    budget: "",
  })

  const navigate = useNavigate()

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50">
          <img src={housevia || "/placeholder.svg"} alt="Modern house" className="object-cover w-full h-full" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-10 pt-20">
          <div className="max-w-4xl mx-auto text-white">
            <h1 className="mb-10 sm:mb-20 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Perfect Firm For Selling
              <br />
              Or renting Houses, Cars,
              <br />
              And Land
            </h1>

            {/* Search Form */}
            <div className="p-6 sm:p-10 bg-white rounded-lg shadow-lg">
              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-black font-bold">Looking for</label>
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
                  <label className="mb-2 text-sm text-black font-bold">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-black font-bold">Property Type</label>
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
                  <label className="mb-2 text-sm text-black font-bold">Property size</label>
                  <input
                    type="text"
                    placeholder="Any size"
                    className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
                    value={filters.propertySize}
                    onChange={(e) => setFilters({ ...filters, propertySize: e.target.value })}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-black font-bold">Your Budget</label>
                  <input
                    type="text"
                    placeholder="Enter budget"
                    className="p-2 border rounded-md border-gray-300 text-gray-800 w-full"
                    value={filters.budget}
                    onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-sm text-black font-bold">&nbsp;</label>
                  <button
                    type="submit"
                    className="p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search Property</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

