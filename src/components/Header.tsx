export default function Header({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) {
  return (
    <>
      <div className="bg-lime-500 text-black w-full flex flex-row gap items-center justify-between p-4 ">
        <img
          src="./src/assets/react.svg"
          alt="Logo"
          className="object-contain"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-3/6"
        />
        <header className="bg-green-600 text-white p-4">
          <h1>My Header</h1>
        </header>
      </div>
    </>
  );
}
