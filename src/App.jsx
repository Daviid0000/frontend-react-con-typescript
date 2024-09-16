import { Routers } from "./routes/PrivateRoutes"
import { AuthenticateUser } from "./context/contextAuthRoutes"

function App() {

  return (
    <>
      <AuthenticateUser>
        <Routers />
      </AuthenticateUser>
    </>
  )
}

export default App
