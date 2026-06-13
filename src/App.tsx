import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layout/SiteLayout";
import { BudgetPage } from "./pages/BudgetPage";
import { GuidePage } from "./pages/GuidePage";
import { HomePage } from "./pages/HomePage";
import { HotelPage } from "./pages/HotelPage";
import { ItineraryPage } from "./pages/ItineraryPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SpotsPage } from "./pages/SpotsPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="itinerary" element={<ItineraryPage />} />
          <Route path="hotel" element={<HotelPage />} />
          <Route path="budget" element={<BudgetPage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="spots" element={<SpotsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
