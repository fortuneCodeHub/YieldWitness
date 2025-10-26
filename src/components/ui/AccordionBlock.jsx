import { ChevronDown } from "lucide-react";
import { useState } from "react";

const AccordionBlock = ({ data }) => {
  // data should be an array of { title: string, content: string }
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="bg-white">
            {/* Header */}
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium text-gray-800">
                {item.title}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div
                className="px-5 pb-4 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="p-4 text-gray-500 italic text-sm">No accordion items available.</p>
      )}
    </div>
  );
};

export default AccordionBlock