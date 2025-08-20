"use client";
import React, { useState, useEffect } from "react";

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <p className="text-sm mb-2 md:mb-0">
        This website uses cookies to improve your experience.{" "}
        <a href="/privacy#cookies" className="underline">
          Learn more
        </a>
      </p>
      <div className="flex gap-2">
        <button
          onClick={declineCookies}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Decline
        </button>
        <button
          onClick={acceptCookies}
          className="bg-blue-500 px-3 py-1 rounded"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
