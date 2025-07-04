
import { Link } from "react-router-dom";
import { CATEGORIES, OPTIONS } from "../../utils/productsGroupings";

// Static category and subcategory data

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
          const imgSize = colCount <= 2 ? "h-36" : "h-24";

          return (
            <div
              key={rowIndex}
              className={`grid gap-4 w-full ${
                colCount === 1
                  ? "grid-cols-1"
                  : colCount === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : colCount === 3
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
              }`}
            >
              {group.map((category) => {
                const items = OPTIONS[category.name] || [];

                return (
                  <div
                    key={category.id}
                    className="bg-white rounded shadow p-4 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
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
                            <span className="block mt-2 text-sm text-gray-700">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={category.href || "#"}
                      className="mt-auto bg-orange-100 hover:bg-green-800 text-black font-semibold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-300 text-center"
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
