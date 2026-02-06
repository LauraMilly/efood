import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Restaurant from "../pages/Restaurant/Restaurant";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurante/:id" element={<Restaurant />} />
        </Routes>
    );
}
