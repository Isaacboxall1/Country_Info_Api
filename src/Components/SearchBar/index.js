import './SearchBar.css'


export default function SearchBar({props}) {

    return (
    <div className="SearchBar">
        <input
            type="text"
            placeholder="Search"
            id="searchbar"
            value={props.searchTerm}
            onChange={props.handleChange}
        />
        <select id="dropdownbox" className="dropdownboxes" onChange={props.handleCategoryChange}> 
        <option value="">
          All Regions
        </option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
        </select>
    </div>)
}