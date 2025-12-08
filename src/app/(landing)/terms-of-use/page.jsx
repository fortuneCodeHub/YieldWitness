// "use client";
// import { useState } from "react";
// import { Particles } from "@/components/ui/Particles";

import MonetagBanner from "@/components/ads/MonetagBanner";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import TopBar from "@/components/ui/TopBar";
import Link from "next/link";

export const metadata = {
    title: "Terms of Use - YieldInvest: Personal Finance, Tech & Insurance Blog",
    description:
      "Review the terms of use for YieldInvest. Learn about your rights, responsibilities, and the policies governing your use of our website and services.",
};
  

export default function TermsOfUsePage() {
    return (
        <>

            {/* Right Ad */}
            <div
                className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 right-2"
            >
                {/* Desktop: spans both columns; Mobile: full width */}
                <MonetagBanner zone="10294151" />
            </div>

            {/* Left Ad */}
            <div
                // key={`ad-${idx}`}
                className="fixed hidden bg-gray-50 border border-dashed border-gray-200 rounded p-6 xl:flex items-center justify-center text-sm text-gray-500 w-[120px] h-[400px] top-40 left-2"
            >
                {/* Desktop: spans both columns; Mobile: full width */}
                <MonetagBanner zone="10294153" />
            </div>

            {/* Top utility bar */}
            <TopBar />
            {/* Navigation bar */}
            <Header />  

            <section className="max-w-5xl mx-auto relative flex flex-col items-center justify-center min-h-screen py-20 px-6 bg-white">
                <div className="space-y-10 w-full bg-white dark:bg-white-800 p-8 rounded-xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900">
                        Terms of Use
                            <Link href="/" className="relative font-bold poppins-bold-italic ms-3">
                                <span className="text-[#0EA5A4]">Yield</span>
                                <span className="text-[#0F172A]">Invest</span>
                                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
                            </Link>
                        </h1>
                        <p className="text-gray-600 max-w-lg mx-auto md:mt-2 mt-4">
                        Please read the following terms and conditions carefully before using our website.
                        </p>
                    </div>
            
                    <div className="space-y-8 text-lg text-gray-700">
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">1. Introduction</h2>
                        <p>
                        Welcome to YieldInvest! These Terms of Use govern your use of our website and services. By accessing and using this website, you agree to comply with these terms.
                        </p>
            
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">2. Acceptance of Terms</h2>
                        <p>
                        By using YieldInvest, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our website.
                        </p>
            
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">3. User Obligations</h2>
                        <p>
                        As a user, you are responsible for complying with all applicable laws and regulations when using our services. You agree not to engage in any illegal or harmful activities.
                        </p>
            
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">4. Account Security</h2>
                        <p>
                        You are responsible for maintaining the confidentiality of your account credentials and for any activities under your account. Please notify us immediately of any unauthorized use.
                        </p>
            
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">5. Intellectual Property</h2>
                        <p>
                        All content on YieldInvest, including articles, graphics, logos, and designs, are the property of YieldInvest and protected by intellectual property laws.
                        </p>
            
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">6. Limitation of Liability</h2>
                        <p>
                        YieldInvest is not liable for any damages resulting from the use or inability to use our website or services. We are not responsible for any third-party content linked to or referenced on our platform.
                        </p>
            
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">7. Changes to Terms</h2>
                        <p>
                        We reserve the right to update these Terms of Use at any time. Any changes will be posted on this page with the updated effective date.
                        </p>
            
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">8. Contact Us</h2>
                        <p>
                            If you have any questions regarding these Terms of Use, please contact us at{" "}
                            <a
                                href="mailto:contactyieldnvest@gmail.com"
                                className="text-[#0EA5A4] hover:underline"
                            >
                                contactyieldnvest@gmail.com
                            </a>
                            .
                            You can also review our <a href="https://www.yieldnvest.com/privacy-policy" className="text-[#0EA5A4] hover:underline">Privacy Policy</a> for more information.
                        </p>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4]">9. Advertising & Third-Party Cookies</h2>
                        <p>
                            YieldInvest uses Google AdSense and other third-party advertising partners. 
                            These partners may use cookies, including Google’s DART cookie, to display 
                            personalized ads based on your visits to our website and other websites. 
                            You may opt out of personalized advertising by visiting Google’s Ad Settings page:
                            {" "}
                            <a
                                href="https://www.google.com/settings/ads"
                                target="_blank"
                                className="text-[#0EA5A4] underline break-all inline-block"
                            >
                                https://www.google.com/settings/ads
                            </a>
                            <br/>
                            To learn more about how Google uses data, you can read:
                            {" "}
                            <a
                            href="https://policies.google.com/technologies/ads"
                            target="_blank"
                            className="text-[#0EA5A4] underline break-all inline-block"
                            >
                            https://policies.google.com/technologies/ads
                            </a>
                        </p>
                    </div>
            
                    <div className="text-center mt-10">
                        <p className="text-sm text-gray-500">
                        Last Updated: <span className="font-medium text-gray-900">December 2023</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
}
  
