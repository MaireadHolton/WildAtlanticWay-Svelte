<script>
    import {setContext} from "svelte";
    import {wawService} from "./services/waw-service";
    import Main from "./pages/Main.svelte";
    import About from "./pages/About.svelte";
    import Community from "./pages/Community.svelte";
    import Login from "./pages/Login.svelte";
    import Signup from "./pages/Signup.svelte";
    import Report from "./pages/Report.svelte";
    import Visit from "./pages/Visit.svelte";
    import Map from "./pages/Map.svelte";
    import Router from "svelte-spa-router";
  
    setContext("wawService", new wawService("http://localhost:4000"));
  
    let routes = {
      "/": Main,
      "/login": Login,
      "/signup": Signup,
      "/visit": Visit,
      "/report": Report,
      "/map": Map,
      "/about": About,
      "/community": Community,
      "/logout": Main
    }
  </script>
  
  <div class="container">
    <Router {routes}/>
  </div>