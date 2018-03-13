<template>
  <div>
    <ul>
      <li v-for="item of 100">
        <router-link style="display: block; padding: 20px;" :to="{ path: '/list/' + item }">{{ item }} list</router-link>
      </li>
    </ul>
  </div>
</template>