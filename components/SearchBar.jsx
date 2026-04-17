"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useEffect, useTransition, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/service/user.service";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import useT from "@/app/hooks/useT";
import { requireAuth } from "@/lib/requireAuth";
import userStore from "@/store/userStore";

const SearchBar = () => {
  const { user } = userStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [filterUser, setFilterUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const t = useT();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await getAllUsers();
        setUserList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // for debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler); // cancel timeout if user types again
    };
  }, [searchQuery]);

  const handleNavigation = (path) => {
    startTransition(() => {
      router.push(path);
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filterUser = userList.filter((user) => {
        return user?.username
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      });
      setFilterUsers(filterUser);
      setIsSearchOpen(true);
    } else {
      setFilterUsers([]);
      setIsSearchOpen(false);
    }
  }, [debouncedSearchTerm, userList]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  //To make the alphabets highlighted
  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={i} className="dark:text-gray-500 font-bold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  //Routing to searched user profile page
  const handleUserClick = async (userId) => {
    try {
      setIsSearchOpen(false);
      setSearchQuery("");
      startTransition(() => router.push(`/user-profile/${userId}`));
    } catch (error) {
      console.log(error);
    }
  };

  //Outside ref to close the search box
  const handleSearchClose = (e) => {
    if (!searchRef.current?.contains(e.target)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleSearchClose);
    return () => {
      document.removeEventListener("click", handleSearchClose);
    };
  });

  const handleInputClick = () => {
    if (filterUser.length > 0) {
      requireAuth(() => {
        setIsSearchOpen(true);
      });
    }
  };

  return (
    <div ref={searchRef} className="md:mr-5">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-8 cursor-pointer w-full dark:bg-[rgb(75,75,75)] bg-white rounded-full"
            placeholder={`${t("search")}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleInputClick}
          />
          <div>
            {isSearchOpen && (
              <div className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1 z-50">
                <div className="p-2">
                  {filterUser.length > 0 ? (
                    filterUser.slice(0, 10).map((user) => (
                      <div
                        className="flex items-center space-x-8 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                        key={user?._id}
                        onClick={() => handleUserClick(user?._id)}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user?.profilePicture}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {user?.username.split(" ")[0][0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate w-[90%]">
                            {highlightMatch(
                              user?.username,
                              debouncedSearchTerm,
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-700">{t("noResults")}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
