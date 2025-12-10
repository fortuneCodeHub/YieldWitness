"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "@/components/ui/Alert";
import Link from "next/link";
import Header from "./Header";
import TopBar from "./TopBar";
import Footer from "./Footer";
import MonetagBanner from "../ads/MonetagBanner";

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_hxszblm", // EmailJS Service ID
        "template_pnu9ter", // Template ID
        {
          from_name: formData.name,
          to_name: "YieldWitness Team (YieldInvest website)",
          message: formData.message,
          reply_to: formData.email,
          to_email: "contactyieldnvest@gmail.com",
          email: "contactyieldnvest@gmail.com",
        },
        "TjJn3m2vAe1BwCtG5" // EmailJS Public Key
      );

      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "✅ Your message has been sent successfully!");
    } catch (error) {
      console.error("Email sending failed:", error);
      showAlertMessage("danger", "❌ Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
       
        {/* Top utility bar */}
        <TopBar />
        {/* Navigation bar */}
        <Header />

        <section className="relative flex items-center justify-center min-h-screen py-20 px-6 bg-white">
        {showAlert && <Alert type={alertType} text={alertMessage} />}

        <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-2xl shadow-md p-8">
            <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 text-gray-900 flex md:flex-row flex-col items-center justify-center">
                Contact Us
                <Link href="/" className="relative font-bold poppins-bold-italic ms-3">
                    <span className="text-[#0EA5A4]">Yield</span>
                    <span className="text-[#0F172A]">Invest</span>
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
                </Link>
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto mt-2">
                Got a question, partnership idea, or feedback? We’d love to hear
                from you. Fill out the form below, and we’ll get back to you shortly.
            </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700"
                >
                Full Name
                </label>
                <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#0EA5A4] outline-none transition"
                />
            </div>

            <div>
                <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700"
                >
                Email Address
                </label>
                <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#0EA5A4] outline-none transition"
                />
            </div>

            <div>
                <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-700"
                >
                Your Message
                </label>
                <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Share your thoughts..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-[#0EA5A4] outline-none transition"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0EA5A4] text-white font-semibold text-lg rounded-lg shadow-md hover:bg-[#0D8C8B] focus:ring-2 focus:ring-[#0EA5A4]/60 disabled:opacity-60 transition-all"
            >
                {isLoading ? "Sending..." : "Send Message"}
            </button>
            </form>

            <div className="text-center mt-10 text-gray-500 text-sm">
            <p>
                Or reach us directly at{" "}
                <a
                    href="mailto:contactyieldnvest@gmail.com"
                    className="text-[#0EA5A4] hover:underline"
                >
                    contactyieldnvest@gmail.com
                </a>
            </p>
            </div>
        </div>
        </section>

        {/* Footer */}
        <Footer />
    </>
  );
}
