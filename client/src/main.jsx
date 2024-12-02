import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import store from "../src/redux/store";
import { Provider } from "react-redux";
import userRoutes from "./routes/userRoutes";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";

const router = createBrowserRouter([
  ...publicRoutes,
  ...userRoutes,
  ...adminRoutes,
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
