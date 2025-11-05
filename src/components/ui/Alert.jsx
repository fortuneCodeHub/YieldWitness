"use client";

const Alert = ({ type, text }) => {
  const baseClasses =
    "fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white shadow-lg transition-all duration-500 z-50";
  const typeClasses =
    type === "success"
      ? "bg-green-500/90"
      : type === "danger"
      ? "bg-red-500/90"
      : "bg-yellow-500/90";

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <p className="font-medium">{text}</p>
    </div>
  );
};

export default Alert;
