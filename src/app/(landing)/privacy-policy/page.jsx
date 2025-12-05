import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import TopBar from "@/components/ui/TopBar";
import Link from "next/link";

export const metadata = {
    title: "Privacy Policy - YieldInvest: Personal Finance, Tech & Insurance Blog",
    description:
      "Read the YieldInvest Privacy Policy to understand how we collect, use, and protect your data across our finance, technology, insurance, and law articles.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            {/* Top utility bar */}
            <TopBar />
            {/* Navigation bar */}
            <Header />

            <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span>Privacy <span className="text-[#0EA5A4]">Policy</span></span>
                        <Link href="/" className="relative font-bold poppins-bold-italic ms-3">
                            <span className="text-[#0EA5A4]">Yield</span>
                            <span className="text-[#0F172A]">Invest</span>
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
                        </Link>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Your privacy matters to us. Learn how YieldInvest collects, protects, and uses your
                        information responsibly.
                    </p>
                </div>

                <div className="space-y-10 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to <strong>YieldInvest</strong> — a modern blog focused on finance,
                            technology, insurance, and law. This Privacy Policy explains how we handle your personal
                            information when you visit our website, subscribe to our updates, or interact with our
                            content and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            2. Information We Collect
                        </h2>
                        <p>
                            We collect information that helps us deliver a better experience, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Personal details like your name and email when you contact us.</li>
                            <li>Analytics data such as IP address, browser type, and time spent on pages.</li>
                            <li>Cookies to enhance usability and personalize your reading experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            3. How We Use Your Information
                        </h2>
                        <p>
                            Your data helps us improve your experience and deliver quality insights. We use it to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Publish relevant articles in finance, tech, insurance, and law.</li>
                            <li>Analyze engagement to create more valuable and accessible content.</li>
                            <li>Send updates, newsletters, or announcements (only with your consent).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            4. Cookies and Tracking
                        </h2>
                        <p>
                            We use cookies and third-party analytics tools like Google Analytics to monitor site
                            performance and user interaction. You can choose to disable cookies in your browser at
                            any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            5. Data Security
                        </h2>
                        <p>
                            At YieldInvest, we take your data security seriously. We use encryption and secure
                            protocols to protect your information from unauthorized access, alteration, or misuse.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            6. Third-Party Links
                        </h2>
                        <p>
                            Our articles may include links to external websites for additional context or resources.
                            We are not responsible for the privacy practices or content of those third-party sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            7. Your Rights
                        </h2>
                        <p>
                            You have the right to request access, correction, or deletion of your personal data. You
                            may also opt out of our mailing list or withdraw consent at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            8. Updates to This Policy
                        </h2>
                        <p>
                            We may occasionally update this Privacy Policy to reflect changes in law or new
                            features. The updated version will always be available on this page with a revised
                            effective date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            9. Contact Us
                        </h2>
                        <p>
                            If you have any questions or concerns about this Privacy Policy, feel free to contact
                            us at{" "}
                            <a
                                href="mailto:contactyieldnvest@gmail.com"
                                className="text-[#0EA5A4] hover:underline"
                            >
                                contactyieldnvest@gmail.com
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-[#0EA5A4] mb-3">
                            10. Google AdSense & Advertising Partners
                        </h2>
                        <p>
                            YieldInvest uses Google AdSense to display advertisements. Google may use
                            cookies, including the DART cookie, to serve personalized ads based on your
                            visits to our website and other sites across the internet.
                        </p>

                        <p className="mt-3">
                            Users may opt out of the use of the DART cookie for personalized advertising
                            by visiting Google’s Ads Settings page:
                            {" "}
                            <a
                            href="https://www.google.com/settings/ads"
                            target="_blank"
                            className="text-[#0EA5A4] underline break-all inline-block"
                            >
                            https://www.google.com/settings/ads
                            </a>
                        </p>

                        <p className="mt-3">
                            Google and its advertising partners may use tracking technologies to measure
                            ad performance, prevent fraud, and personalize ad content. These partners
                            may automatically collect information such as your IP address, device type,
                            browser, and browsing behavior for analytics and advertising purposes.
                        </p>

                        <p className="mt-3">
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
                    </section>

                </div>

                <div className="mt-16 text-center text-gray-500 text-sm">
                    <p>Last updated: November 2025</p>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    )
}