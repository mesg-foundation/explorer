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
  color: #bbb;
  font-size: 13px;
  border-top: 1px solid #eee;
  margin-top: 35px;
  padding-top: 15px;
}
</style>