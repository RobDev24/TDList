<template>
  <div id="app">

    <b-navbar toggleable="lg" type="dark" variant="dark">

<b-navbar-brand to="/">Home</b-navbar-brand>

<b-collapse id="nav-collapse" is-nav>

 <b-button-group>
 
 <b-dropdown text="Menu">
   <b-dropdown-item to="/list">List</b-dropdown-item>
   <b-dropdown-item to="/form">form</b-dropdown-item>
   <b-dropdown-divider></b-dropdown-divider>
   <b-dropdown-item>Item 3</b-dropdown-item>
 </b-dropdown>
 
</b-button-group>


</b-collapse>
</b-navbar>

    
    <router-view/>
  </div>
</template>


