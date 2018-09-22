<template>
  <div id="app">
      <img class="logo" src="./assets/logo.png">
    <div id="nav">
      <router-link to="/home">Explore</router-link> |
      <router-link to="/connections">Connections</router-link> | 
      <router-link to="/profile">My Profile</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  padding-top:0.5em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #d11819;
}
</style>
