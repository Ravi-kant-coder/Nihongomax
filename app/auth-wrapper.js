"use client";
import { checkUserAuth, logout } from "@/service/auth.service";
import userStore from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import NavbarBelow from "./NavbarBelow";
import socket from "@/lib/socket"; // 👈 import socket

export default function AuthWrapper({ children }) {
  const { user, setUser, clearUser } = userStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/user-login";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await checkUserAuth();
        if (result.isAuthenticated) {
          setUser(result?.user);
          setIsAuthenticated(true);

          // 👇 Connect socket after login
          if (!socket.connected) {
            socket.connect();
          }
          if (result?.user?._id) {
            socket.emit("join", result.user._id);
            console.log("✅ Joined socket as:", result.user._id);
          }
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
      if (!isLoginPage) {
        router.push("/user-login");
      }

      // 👇 Disconnect socket on logout
      if (socket.connected) {
        socket.disconnect();
        console.log("❌ Socket disconnected");
      }
    };

    if (!isLoginPage) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [isLoginPage, router, setUser, clearUser]);

  if (!isAuthenticated && !isLoginPage) {
    return <Spinner />;
  }

  return (
    <>
      {!isLoginPage && isAuthenticated && (
        <>
          <Navbar />
          <NavbarBelow />
        </>
      )}
      {(isAuthenticated || isLoginPage) && children}
    </>
  );
}
