import Home from "./Home";
import Login from "./pages/Login";
import Oqituvchilar from "./pages/Oqituvchilar";
import Tadbirlar from "./pages/Tadbirlar";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Murojatlar from "./pages/Murojat";
import Tumanlar from "./pages/Tumanlar";
import Youtube from "./pages/Youtube";
import Hujjatlar from "./pages/Hujjatlar";
import Gallery from "./pages/Galerry";
import Projects from "./pages/Projects";
import Prezentatsiyalar from "./pages/Prezentatsiyalar";
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
        path: "/home/youtube/uz",
        component: Youtube,
      },
      {
        path: "/home/gallery/uz",
        component: Gallery,
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
        component: News,
      },
      {
        path: "/home/rahbariyat/uz",
        component: Oqituvchilar,
      },

      {
        path: "/home/tadbirlar/uz",
        component: Tadbirlar,
      },
      {
        path: "/home/hujjatlar/uz",
        component: Hujjatlar,
      },
      {
        path: "/home/tumanlar/uz",
        component: Tumanlar,
      },
      {
        path: "/home/loyihalar/uz",
        component: Projects,
      },
      {
        path: "/home/prezentatsiyalar/uz",
        component: Prezentatsiyalar,
      },
    ],
  },
];

export default routes;
