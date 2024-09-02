import {  RouterProvider } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import { router } from "./routes/routes"
const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App
