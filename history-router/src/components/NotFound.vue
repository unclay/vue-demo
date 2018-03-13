<template>
  <div class="404">
    <h1>404</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route)
    console.log(this.$router)
  }
}
</script>