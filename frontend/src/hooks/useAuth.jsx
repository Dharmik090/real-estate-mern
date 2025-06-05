import { useEffect, useState } from "react";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, []);

    return { isLoggedIn, setIsLoggedIn };
}
