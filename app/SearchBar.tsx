'use client'

function SearchBar({q}) {
  const handleSubmit = e => {
    if(e.which === 13) window.location = '/search?q=' + e.target.value;
  }
    return (
        <div>
            <input type="text" defaultValue={q} onKeyDown={handleSubmit}></input>
       </div>
    )
}

export default SearchBar