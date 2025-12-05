import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import TopBar from "@/components/ui/TopBar";
import Link from "next/link";

export const metadata = {
    title: "About Us - YieldInvest: Personal Finance, Tech & Insurance Blog",
    description:
      "Learn about YieldInvest — a modern blog dedicated to finance, technology, insurance, and law. Our mission is to make complex topics simple and insightful for everyone.",
};
  
export default function AboutPage() {
    return (
      <>
        {/* Top utility bar */}
        <TopBar />
        {/* Navigation bar */}
        <Header />
        <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
              About
              <Link href="/" className="relative font-bold poppins-bold-italic ms-3">
                  <span className="text-[#0EA5A4]">Yield</span>
                  <span className="text-[#0F172A]">Invest</span>
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
              </Link>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-center">
              Your digital window into the world of personal finance, technology and insurance.
            </p>
          </div>
    
          <div className="space-y-10 text-lg leading-relaxed text-center">
            <p>
              <strong>YieldInvest</strong> is more than just a blog — it’s a platform for thinkers,
              professionals, and everyday readers who want to stay ahead of change. We simplify complex
              ideas across <span className="font-semibold">personal finance, technology and insurance</span> —
              delivering insights that inform, inspire, and empower.
            </p>
    
            <p>
              Our mission is simple: to bridge the gap between industries and ideas. Whether it’s
              decoding blockchain’s role in banking, exploring AI in legal systems, or analyzing the
              future of digital insurance, we bring depth and clarity to every topic we touch.
            </p>
    
            <div className="border-l-4 border-blue-600 pl-6 italic text-gray-700">
              “At YieldInvest, we believe knowledge should be accessible, practical, and deeply human.
              Every story we publish carries a purpose — to help you make better, smarter decisions.”
            </div>
    
            <p>
              Founded by passionate writers and developers, YieldInvest merges technology with
              storytelling to create a space that feels personal and professional at once. Our readers
              include investors, entrepreneurs, legal experts, students, and everyday curious minds
              looking to understand the trends shaping our world.
            </p>
    
            <p>
              We are constantly evolving, driven by curiosity and guided by truth. If you share our
              passion for meaningful insights, we invite you to explore our latest posts and become part
              of the YieldInvest community.
            </p>
          </div>
    
          <div className="mt-16 text-center">
            <a
              href="/"
              className="inline-block bg-[#0EA5A4] text-white px-8 py-3 rounded-full font-medium hover:bg-[#6eebeb] transition-colors"
            >
              Explore Latest Articles
            </a>
          </div>
          
        </section>

        {/* Author Bio Section */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Chief Editor</h2>
            <p className="text-lg text-gray-600">
              The mind guiding <span className="font-semibold">YieldInvest</span> — also known as 
              <span className="ms-2 font-semibold text-[#0EA5A4]">“The Yield Witness.”</span>
            </p>
          </div>

          {/* Author Card */}
          <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start gap-10">
              
              {/* Author Images */}
              <div className="flex flex-col items-center gap-4 md:w-1/3">
                <img
                  src="/assets/images/mark-peter1.jpg" 
                  alt="Peter Mark - Chief Editor of YieldInvest"
                  className="w-40 h-40 object-cover rounded-full shadow-md"
                />
                
                {/* <img
                  src="" 
                  alt="Peter Mark working on fintech dashboards"
                  className="w-40 h-40 object-cover rounded-lg shadow-md"
                /> */}
              </div>

              {/* Author Text */}
              <div className="md:w-2/3 space-y-6 text-lg leading-relaxed">
                <p>
                  <strong>Peter Mark</strong> is the Chief Editor of YieldInvest.com — guiding the 
                  platform’s editorial vision with deep expertise in web technologies, AI systems, 
                  and fintech innovations. His goal is simple: deliver precise, technology-centered 
                  insights across personal finance, insurance, and digital banking.
                </p>

                <h3 className="text-2xl font-semibold mt-6">Professional Experience</h3>
                <p>
                  <strong>Frontend Developer – Notty Terminal</strong><br />
                  Peter builds real-time trading dashboards and advanced algorithmic interfaces for 
                  Notty Terminal, a next-generation web3 fintech company.
                </p>
                <p className="text-sm text-gray-600">
                  Twitter/X:{" "}
                  <a className="text-blue-600 underline break-all inline-block" href="https://x.com/Nottytmn?s=09" target="_blank">
                    https://x.com/Nottytmn?s=09
                  </a>
                  <br />
                  Colosseum Project Page:{" "}
                  <a className="text-blue-600 underlinebreak-all inline-block" href="https://arena.colosseum.org/projects/explore/notty-terminal" target="_blank">
                    Notty Terminal on Colosseum
                  </a>
                </p>

                <p>
                  <strong>Chief Editor – YieldInvest.com</strong><br />
                  Peter leads the content strategy, ensuring every financial or insurance topic is 
                  accurate, trustworthy, and beginner-friendly — while being grounded in real fintech 
                  industry experience.
                </p>

                <h3 className="text-2xl font-semibold mt-6">Education & Certifications</h3>
                {/* <h3 className="text-2xl font-semibold mt-6">Education & Certifications</h3> */}
                <ul className="list-disc ml-5 space-y-3 text-gray-700">

                  <li>
                    freeCodeCamp – Responsive Web Design (2025) <br />
                    <a href="https://www.freecodecamp.org/learn/responsive-web-design-v9" target="_blank"
                      className="text-blue-600 underline break-all inline-block">https://www.freecodecamp.org/learn/responsive-web-design-v9</a>
                  </li>

                  <li>
                    UniAthena – Basics of Risk Management in Insurance Sector <br />
                    <a href="https://uniathena.com/short-courses/basics-of-risk-management-in-insurance-sector" target="_blank"
                      className="text-blue-600 underline break-all inline-block">https://uniathena.com/short-courses/basics-of-risk-management-in-insurance-sector</a>
                  </li>

                  <li>
                    Alison – Diploma in Risk Management <br />
                    <a href="https://alison.com/topic/learn/70676/learning-outcomes" target="_blank"
                      className="text-blue-600 underline break-all inline-block">https://alison.com/topic/learn/70676/learning-outcomes</a>
                  </li>

                  <li>
                    Alison – Property & Liability Risk <br />
                    <a href="https://alison.com/topic/learn/75434/learning-outcomes" target="_blank"
                      className="text-blue-600 underline break-all inline-block">https://alison.com/topic/learn/75434/learning-outcomes</a>
                  </li>

                  <li>
                    freeCodeCamp – Frontend Development Libraries <br />
                    <a href="https://www.freecodecamp.org/learn/front-end-development-libraries-v9/" target="_blank"
                      className="text-blue-600 underline break-all inline-block">https://www.freecodecamp.org/learn/front-end-development-libraries-v9/</a>
                  </li>

                  <li>
                    Alison – AI in Personal Finance and Investments <br />
                    <a href="https://alison.com/topic/learn/158327/learning-outcomes" target="_blank"
                      className="text-blue-600 underline break-all inline-block">https://alison.com/topic/learn/158327/learning-outcomes</a>
                  </li>

                  <li>
                    Alison – Professional Personal Finance Advisor <br />
                    <a href="https://alison.com/topic/learn/158327/learning-outcomes" target="_blank"
                      className="text-blue-600 underline break-all inline-block">https://alison.com/topic/learn/158327/learning-outcomes</a>
                  </li>
                </ul>

                <p>
                  <strong>Ongoing Research:</strong><br />
                  Artificial intelligence in personal finance, trading dashboards, and insurance 
                  automation — ensuring YieldInvest stays ahead of fintech innovation.
                </p>

                <h3 className="text-2xl font-semibold mt-6">Professional Profiles</h3>
                <ul className="list-disc ml-5 space-y-2 text-blue-600">
                  <li><a href="https://www.linkedin.com/in/peter-mark-98b429398?trk=contact-info" target="_blank" className="underline break-all inline-block">LinkedIn Profile</a></li>
                  <li><a href="https://independent.academia.edu/PeterMark67" target="_blank" className="underline break-all inline-block">Academia.edu</a></li>
                  <li><a href="https://medium.com/@petermark.editor" target="_blank" className="underline break-all inline-block">Medium Articles</a></li>
                </ul>

                <p className="text-sm text-gray-500 border-t pt-4">
                  <strong>Disclaimer:</strong> All material is for educational purposes only. 
                  Nothing here constitutes personalized financial or insurance advice. 
                  Consult certified professionals for specific guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </>
    );
}
  