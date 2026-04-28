type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchBar({ query, onQueryChange, onSearch }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search artworks..."
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <button onClick={onSearch}>Search</button>
    </div>
  );
}
