"use client";
import { checkUserAuth, logout } from "@/service/auth.service";
import userStore from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import NavbarBelow from "./NavbarBelow";
import LeftSideBar from "./LeftSideBar";

export default function AuthWrapper({ children }) {
  const { setUser, clearUser } = userStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isResetPasswordPage = pathname.startsWith("/reset-password");
  const isLoginPage = pathname === "/user-login";
  const isPublicPage = isLoginPage || isResetPasswordPage;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await checkUserAuth();
        if (result.isAuthenticated) {
          setUser(result?.user);
          setIsAuthenticated(true);
        } else {
          await handleLogout();
        }
      } catch (error) {
        console.error("Authentication fail ho gaya", error);
        await handleLogout();
      } finally {
        setLoading(false);
      }
    };

    const handleLogout = async () => {
      clearUser();
      setIsAuthenticated(false);
      try {
        await logout();
      } catch (error) {
        console.log("logout failed please try again later", error);
      }

      if (!isPublicPage) {
        router.push("/user-login");
      }
    };

    if (!isPublicPage) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [isPublicPage, router, setUser, clearUser]);

  if (loading && !isPublicPage) {
    return <Spinner />;
  }

  return (
    <>
      {!isLoginPage && isAuthenticated && (
        <>
          <Navbar />
          <LeftSideBar />
          <NavbarBelow />
        </>
      )}
      {(isAuthenticated || isPublicPage) && children}
    </>
  );
}
