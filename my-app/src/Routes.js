import Home from "./Home";
import Login from "./pages/Login";
import Rahbariyat from "./pages/Rahbariyat";
import Tadbirlar from "./pages/Tadbirlar";
import Dashboard from "./pages/Dashboard";
import Yangiliklar from "./pages/Yangiliklar";
import Murojatlar from "./pages/Murojat";
import Documents from "./pages/documents";
import Tumanlar from "./pages/Tumanlar";
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
      {
        path: "/home/hujjatlar/uz",
        component: Documents,
      },
      {
        path: "/home/tumanlar/uz",
        component: Tumanlar,
      },
    ],
  },
];

export default routes;
