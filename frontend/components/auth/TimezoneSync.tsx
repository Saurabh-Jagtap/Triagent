"use client";
import { useEffect } from "react";

export default function TimezoneSync() {
    useEffect(() => {
        const timezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;

        fetch("/api/user/timezone", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ timezone }),
        }).catch((error) => {
            console.error("Failed to sync timezone:", error);
        });
    }, []);

    return null;
}