"use client";
import { checkUserAuth } from "@/service/auth.service";
import userStore from "@/store/userStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Navbar from "./Navbar";
import NavbarBelow from "./NavbarBelow";
import LeftSideBar from "./LeftSideBar";
import AuthModal from "@/components/AuthModal";

export default function AuthWrapper({ children }) {
  const { setUser, clearUser } = userStore();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isResetPasswordPage = pathname.startsWith("/reset-password");
  const isLoginPage = pathname === "/user-login";

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const result = await checkUserAuth();

        if (!isMounted) return;

        if (result?.isAuthenticated) {
          setUser(result.user);
          setIsAuthenticated(true);
        } else {
          clearUser();
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isMounted) {
          clearUser();
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearUser]);

  if (loading && !isLoginPage && !isResetPasswordPage) {
    return <Spinner />;
  }

  return (
    <>
      {!isLoginPage && !isResetPasswordPage && (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <LeftSideBar isAuthenticated={isAuthenticated} />
          <NavbarBelow isAuthenticated={isAuthenticated} />
        </>
      )}
      {children}
      <AuthModal />
    </>
  );
}
