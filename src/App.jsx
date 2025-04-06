// App.jsx
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [allShops, setAllShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Real search term
  const [tempSearchTerm, setTempSearchTerm] = useState(""); // Typing term
  const [gradeFilter, setGradeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoffeeShops() {
      try {
        const response = await fetch(
          "https://data.cityofnewyork.us/resource/43nn-pn8j.json?cuisine_description=Coffee%2FTea&$limit=1000",
        );
        const data = await response.json();
        setAllShops(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coffee shops:", error);
        setLoading(false);
      }
    }
    fetchCoffeeShops();
  }, []);

  // 📞 Format phone numbers
  function formatPhoneNumber(phone) {
    if (!phone) return "Not Available";
    const cleaned = ("" + phone).replace(/\D/g, "");
    if (cleaned.length === 10) {
      const areaCode = cleaned.slice(0, 3);
      const centralOfficeCode = cleaned.slice(3, 6);
      const lineNumber = cleaned.slice(6);
      return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
    } else {
      return phone;
    }
  }

  // 📈 Summary Statistics
  const totalCoffeeShops = allShops.length;
  const gradeACoffeeShops = allShops.filter(
    (shop) => shop.grade === "A",
  ).length;
  const averageHealthScore = (
    allShops
      .filter((shop) => shop.score)
      .reduce((sum, shop) => sum + Number(shop.score), 0) /
    allShops.filter((shop) => shop.score).length
  ).toFixed(2);

  // 🔎 Filtered shops
  const filteredShops = allShops.filter((shop) => {
    const matchesName =
      shop.dba && shop.dba.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter ? shop.grade === gradeFilter : true;
    return matchesName && matchesGrade;
  });

  // 🎯 Top 10 popular (Grade A)
  const top10Popular = allShops
    .filter((shop) => shop.grade === "A")
    .slice(0, 10);

  const shopsToShow = searchTerm || gradeFilter ? filteredShops : top10Popular;

  return (
    <main>
      <h1>NYC Coffee Shops ☕</h1>

      {/* 🔎 Search Bar with DONE Button */}
      <div className="search-bar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search coffee shops..."
            value={tempSearchTerm}
            onChange={(e) => setTempSearchTerm(e.target.value)}
          />
          <button
            className="done-button"
            onClick={() => setSearchTerm(tempSearchTerm)}
          >
            Done
          </button>
        </div>
      </div>

      {/* 🗂️ Grade Filter Dropdown */}
      <div className="filter-bar">
        <label htmlFor="grade">
          <strong>Filter by Grade:</strong>
        </label>
        <select
          id="grade"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
        >
          <option value="">All Grades</option>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C</option>
        </select>
      </div>

      {loading ? (
        <p>Loading coffee shops...</p>
      ) : (
        <>
          {/* 📈 Summary Statistics */}
          <div className="summary-stats">
            <h2>Summary Statistics</h2>
            <p>
              <strong>Total Coffee Shops in NYC:</strong> {totalCoffeeShops}
            </p>
            <p>
              <strong>Number of Grade A Coffee Shops:</strong>{" "}
              {gradeACoffeeShops}
            </p>
            <p>
              <strong>Average Health Score:</strong> {averageHealthScore}
            </p>
          </div>

          {/* 📋 Health Score Guide */}
          <div className="score-table">
            <h2>Health Score Guide</h2>
            <table>
              <thead>
                <tr>
                  <th>Score Range</th>
                  <th>Grade</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0–13</td>
                  <td>A</td>
                  <td>Very good</td>
                </tr>
                <tr>
                  <td>14–27</td>
                  <td>B</td>
                  <td>Okay but some problems</td>
                </tr>
                <tr>
                  <td>28 or higher</td>
                  <td>C</td>
                  <td>Poor or have some issues</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ☕ Coffee Shop List */}
          <ul>
            <p className="bold-line">
              <strong>
                Showing {shopsToShow.length}{" "}
                {searchTerm || gradeFilter
                  ? "filtered results"
                  : "popular coffee shops"}
              </strong>
            </p>

            {shopsToShow.map((shop, index) => (
              <li key={index}>
                <strong>{shop.dba || "Unknown Name"}</strong>
                <div className="address">
                  Address: {shop.building} {shop.street} {shop.zipcode} <br />
                  Phone:{" "}
                  {shop.phone
                    ? formatPhoneNumber(shop.phone)
                    : "Not Available"}{" "}
                  <br />
                  Health Score: {shop.score || "N/A"} <br />
                  Grade:{" "}
                  {["A", "B", "C"].includes(shop.grade)
                    ? shop.grade
                    : "Not Available"}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
