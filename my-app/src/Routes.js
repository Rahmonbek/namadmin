import Home from "./Home";
import Login from "./pages/Login";
import Rahbariyat from "./pages/Rahbariyat";
import Tadbirlar from "./pages/Tadbirlar";
import Dashboard from "./pages/Dashboard";
import Yangiliklar from "./pages/Yangiliklar";
import Murojatlar from "./pages/Murojat";
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    routes: [
      {
        path: "/home/dashboard/uz",
        component: Dashboard,
      },
      {
        path: "/home/murojaatlar/uz",
        component: Murojatlar,
      },
      // {
      //   path: "/home/oquvchilar/uz",
      //   component: Oquvchilar,
      // },
    
    
      {
        path: "/home/yangiliklar/uz",
        component: Yangiliklar,
      },
      {
        path: "/home/rahbariyat/uz",
        component: Rahbariyat,
      },
    
    
      {
        path: "/home/tadbirlar/uz",
        component: Tadbirlar,
      },
    
    ],
  },
];

export default routes;
