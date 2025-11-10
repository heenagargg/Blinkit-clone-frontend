import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params.search.slice(3);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg shadow overflow-hidden flex items-center text-neutral-500 bg-slate-50 focus-within:border-amber-300">
      <div>
        {isMobile && isSearchPage ? (
          <Link to={"/"}>
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex items-center justify-center h-full p-3">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          <div
            onClick={() => redirectToSearchPage()}
            className="h-full w-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                'Search "milk"',
                1000,
                'Search "butter"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "bread"',
                1000,
                'Search "curd"',
                1000,
                'Search "apple"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "1em", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              defaultValue={searchText}
              className="bg-transparent w-full h-full outline-none"
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
