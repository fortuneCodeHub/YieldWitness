'use client'
import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";

// const CookieBanner = () => {
//   const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(true);

//   // Run when the component is mounted
//   useEffect(() => {
//     // Check if the user has already accepted cookies
//     if (localStorage.getItem("user-consent")) {
//       // Initialize Google Analytics if consent is already given
//       window.dataLayer = window.dataLayer || [];
//       window.gtag = function () {
//         window.dataLayer.push(arguments);
//       };
//       gtag("js", new Date());
//       gtag("config", "G-H1QYN3T4M0");
//     }
//   }, []);

//   return (
//     isCookieBannerVisible && (
//       <>
//         <CookieConsent
//           location="bottom"
//           buttonText="Accept"
//           cookieName="user-consent"
//           style={{
//             background: "#0EA5A4",
//             color: "#fff",
//             fontSize: "14px",
//             padding: "15px",
//             textAlign: "center",
//           }}
//           buttonStyle={{
//             background: "#fff",
//             color: "#0EA5A4",
//             borderRadius: "5px",
//             fontSize: "14px",
//             padding: "10px 15px",
//             marginLeft: "10px",
//             cursor: "pointer",
//           }}
//           expires={365}
//           onAccept={() => {
//             // Set cookie consent on acceptance
//             localStorage.setItem("user-consent", "true");
//             // Initialize Google Analytics after acceptance
//             window.dataLayer = window.dataLayer || [];
//             window.gtag = function () {
//               window.dataLayer.push(arguments);
//             };
//             gtag("js", new Date());
//             gtag("config", "G-H1QYN3T4M0");
//           }}
//           enableDeclineButton={false} // disable built-in decline button
//         >
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <p style={{ marginBottom: "10px" }}>
//               This website uses cookies to enhance the user experience.{" "}
//               <a href="/privacy-policy" className="text-white underline">
//                 Learn more
//               </a>
//             </p>
//             <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//               <button
//                 onClick={() => setIsCookieBannerVisible(false)}
//                 style={{
//                   background: "transparent",
//                   border: "1px solid #fff",
//                   color: "#fff",
//                   borderRadius: "5px",
//                   fontSize: "14px",
//                   padding: "10px 15px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </CookieConsent>
//       </>
//     )
//   );
// };

// export default CookieBanner;


const CookieBanner = () => {
    const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(true);
  
    useEffect(() => {
      if (localStorage.getItem("user-consent")) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
        gtag("js", new Date());
        gtag("config", "G-H1QYN3T4M0");

        setIsCookieBannerVisible(false)
      }
    }, []);
  
    if (!isCookieBannerVisible) return null;
  
    return (
      <CookieConsent
        location="bottom"
        cookieName="user-consent"
        expires={365}
        enableDeclineButton={false}
        buttonText=""
        style={{
          background: "#0EA5A4",
          color: "#fff",
          fontSize: "14px",
          padding: "10px 20px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "120px",
        }}
        contentStyle={{
          maxWidth: "800px",
          margin: "0 auto",
          flexGrow: 1, 
        }}
        ButtonComponent={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => {
                localStorage.setItem("user-consent", "true");
                window.dataLayer = window.dataLayer || [];
                window.gtag = function () {
                  window.dataLayer.push(arguments);
                };
                gtag("js", new Date());
                gtag("config", "G-H1QYN3T4M0");
                setIsCookieBannerVisible(false);
              }}
              style={{
                background: "#fff",
                color: "#0EA5A4",
                borderRadius: "5px",
                fontSize: "14px",
                padding: "8px 14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Accept
            </button>
            <button
              onClick={() => {
                localStorage.setItem("user-consent", "false");
                gtag("consent", "update", {
                  ad_storage: "denied",
                  analytics_storage: "denied",
                });
                setIsCookieBannerVisible(false);
              }}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: "5px",
                fontSize: "14px",
                padding: "8px 14px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      >
        {/* Removed negative margin bottom as it is no longer necessary with reduced height */}
        <span style={{ display: "block" }}> 
          This website uses cookies to enhance the user experience.{" "}
          <a href="/privacy-policy" className="text-white underline">
            Learn more
          </a>
        </span>
      </CookieConsent>
    );
  };
  
  export default CookieBanner;