import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import YieldForm from "./YieldForm";
import HistoryPage from "./historypage";
import ResultPage from "./ResultPage";
import Header from "./components/Header";
import Topbar from "./components/Topbar"; 
import DashboardPage from "./DashboardPage";
import SchemesPage from "./SchemesPage";
import ProfitLossPage from "./ProfitLossPage";
import RewardPage from "./RewardPage";
function App() {
  return (
    <Router>
      <Topbar/>
      <Header />
      <Routes>
        <Route path="/" element={<YieldForm />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
       <Route path="/dashboard" element={<DashboardPage />} />
       <Route path="/schemes" element={<SchemesPage />} />
       <Route path="/profit-loss" element={<ProfitLossPage/>} />
       <Route path="/rewards" element={<RewardPage/>} />
       
      </Routes>
    </Router>
  );
}

export default App;