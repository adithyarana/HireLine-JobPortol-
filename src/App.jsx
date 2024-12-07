import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Button } from "./components/ui/button"
import "./App.css";
import Applayout from "./layouts/layout"
import LandingPage from "./pages/LandingPage"
import Onboardiing from "./pages/Onboardiing"
import Job from "./pages/Job"
import Joblisting from "./pages/Joblisting"
import Myjobs from "./pages/Myjobs"
import Postjobs from "./pages/Postjobs"
import Savedjobs from "./pages/Savedjobs"
import { ThemeProvider } from "./components/themeprovider";
import Protectedroutes from "./components/Protectedroutes";

const router = createBrowserRouter([
  {
    element:<Applayout/>,
    children:[
      {
        path: "/",
        element:<LandingPage />
      },
      {
        path: "/onboarding",
        element:
          <Protectedroutes>
            <Onboardiing/>
          </Protectedroutes>
      },
      {
        path: "/job/:id",
        element:
         <Protectedroutes>
           <Job/>
         </Protectedroutes>
      },
      {
        path: "/jobs",
        element:
         <Protectedroutes>
            <Joblisting/>
         </Protectedroutes>
      },
      {
        path: "/myjobs",
        element:
       <Protectedroutes>
            <Myjobs/>
       </Protectedroutes>
      },
      {
        path: "/postjobs",
        element:
        <Protectedroutes>
            <Postjobs/>
        </Protectedroutes>
      },
      {
        path: "/savedjobs",
        element:
         <Protectedroutes>
           <Savedjobs/>
         </Protectedroutes>
      },

    ]
  }
])
function App() {
  
  

  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
     </ThemeProvider>

 
  )
}

export default App
