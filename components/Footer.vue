<template>
  <section class="footer">
    Copyright © {{ year }} MESG Foundation, All rights reserved.
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      year: (new Date).getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  color: #222;
  font-size: 13px;
  border-top: 1px solid #eee;
  padding: 15px 40px;
  background-color: #ffa744;
}
</style>