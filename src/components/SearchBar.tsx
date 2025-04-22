import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const SearchBar = () => {
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/"); // always navigate home when searching
  };

  return (
    <form onSubmit={handleSearch} className="flex-grow sm:mx-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full sm:max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
    </form>
  );
};

export default SearchBar;
