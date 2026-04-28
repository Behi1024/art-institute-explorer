type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchBar({ query, onQueryChange, onSearch }: SearchBarProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        placeholder="Search artworks..."
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}
