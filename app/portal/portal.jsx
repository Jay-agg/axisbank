"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Star,
  CreditCard,
  Banknote,
  Repeat,
  Users,
  PiggyBank,
  Landmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductCard = ({
  title,
  icon: Icon,
  rating,
  votes,
  description,
  isTopPick,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#F5F2F2] rounded-lg border border-black border-opacity-10 overflow-hidden relative flex flex-col h-full"
    >
      {isTopPick && (
        <div className="absolute top-0 right-0 bg-[#D1406E] text-white text-xs font-bold px-2 py-1 rounded-bl">
          Top Pick
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-3">
          <Icon className="w-6 h-6 text-[#B31A4B] mr-2" />
          <h3 className="text-xl font-semibold text-[#29292A]">{title}</h3>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 cursor-pointer transition-colors ${
                i < (hoverRating || rating)
                  ? "text-[#D1406E] fill-current"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
          <span className="ml-2 text-sm text-[#29292A]">
            {rating.toFixed(1)} ({votes} votes)
          </span>
        </div>
        <p className="text-[#29292A] mb-4">{description}</p>
      </div>
      <div className="p-6 mt-auto">
        <button className="w-full bg-[#B31A4B] text-[#F5F2F2] py-2 rounded-lg hover:bg-[#D1406E] transition-colors">
          View More
        </button>
      </div>
    </motion.div>
  );
};

const CategorySection = ({ title, products }) => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold text-[#29292A] mb-4 flex items-center">
      <Landmark className="w-6 h-6 mr-2 text-[#B31A4B]" />
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-[#F5F2F2] text-[#29292A] disabled:opacity-50 hover:bg-[#D1406E] hover:text-[#F5F2F2]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded-full ${
            currentPage === number
              ? "bg-[#B31A4B] text-[#F5F2F2]"
              : "bg-[#F5F2F2] text-[#29292A] hover:bg-[#D1406E] hover:text-[#F5F2F2]"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-[#F5F2F2] text-[#29292A] disabled:opacity-50 hover:bg-[#D1406E] hover:text-[#F5F2F2]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const AxisBankAPIPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All Products",
    "Featured Use Cases",
    "Product API",
    "Cross Cutting",
  ];

  const products = [
    {
      title: "Corporate Payments",
      icon: Banknote,
      rating: 3,
      votes: 14,
      description:
        "APIs for corporate money transfers to own accounts, third party accounts and external accounts.",
      isTopPick: true,
    },
    {
      title: "Corporate Collections",
      icon: Repeat,
      rating: 4,
      votes: 7,
      description:
        "APIs that offer services for recurring deposit and fixed deposit.",
      isTopPick: true,
    },
    {
      title: "UPI",
      icon: CreditCard,
      rating: 4,
      votes: 9,
      description: "APIs that offer services for UPI transactions.",
      isTopPick: true,
    },
    {
      title: "Bill Payments",
      icon: PiggyBank,
      rating: 5,
      votes: 3,
      description: "APIs that offer services for Bill Payments",
    },
    {
      title: "Corporate Services",
      icon: Users,
      rating: 4,
      votes: 2,
      description:
        "APIs that offer services for recurring deposit and fixed deposit.",
    },
    {
      title: "Loans",
      icon: Banknote,
      rating: 1,
      votes: 2,
      description: "APIs that offer services for Loan.",
    },
    // Add more products as needed to demonstrate pagination
  ];

  const productsPerPage = 6;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen bg-[#F5F2F2]">
      <header className="bg-gradient-to-r from-[#B31A4B] to-[#D1406E] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* <motion.img
                src="/axis-bank-logo.svg" // Assume we have this logo
                alt="Axis Bank Logo"
                className="h-10"
                whileHover={{ scale: 1.1 }}
              /> */}
              <div>
                <h1 className="text-2xl font-bold">Axis Bank</h1>
                <span className="text-sm bg-[#181A1D] px-2 py-1 rounded">
                  API Developer Portal
                </span>
              </div>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {["Home", "How It Works", "APIs", "Partnership", "Support"].map(
                  (item) => (
                    <motion.li key={item} whileHover={{ scale: 1.1 }}>
                      <a href="#" className="hover:text-[#F5F2F2]">
                        {item}
                      </a>
                    </motion.li>
                  )
                )}
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hidden md:block p-2 border border-[#29292A] rounded-lg focus:ring-2 focus:ring-[#B31A4B] focus:border-transparent"
              />
              <button className="bg-[#F5F2F2] text-[#B31A4B] py-2 px-4 rounded-lg hover:bg-[#D1406E] hover:text-[#F5F2F2] transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="font-semibold text-lg mb-4 text-[#29292A]">
                Categories
              </h2>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-2 rounded mb-2 flex items-center justify-between ${
                    selectedCategory === category
                      ? "bg-[#F5F2F2] text-[#B31A4B]"
                      : "hover:bg-[#F5F2F2]"
                  }`}
                >
                  {category}
                  <ChevronDown className="w-4 h-4" />
                </button>
              ))}
            </div>
          </aside>

          <section className="md:w-3/4">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-[#29292A] mb-8"
            >
              Featured Products
            </motion.h2>

            <div className="mb-8">
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border border-[#29292A] rounded-lg focus:ring-2 focus:ring-[#B31A4B] focus:border-transparent"
              />
            </div>

            <CategorySection
              title="Customer Top Picks"
              products={paginatedProducts.filter((p) => p.isTopPick)}
            />

            <CategorySection
              title="All Products"
              products={paginatedProducts}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </section>
        </div>
      </main>

      <footer className="bg-[#29292A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Contact", "FAQs"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#D1406E]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Add more footer sections as needed */}
          </div>
          <div className="mt-8 pt-8 border-t border-[#181A1D] text-center">
            <p>&copy; 2024 Axis Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AxisBankAPIPortal;
