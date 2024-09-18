import { AuthenticateUser } from "./context/contextAuthRoutes"
import AllRoutes from "./routes/AllRoutes"

function App() {

  return (
    <>
      <AuthenticateUser>
        <AllRoutes />
      </AuthenticateUser>
    </>
  )
}

export default App
