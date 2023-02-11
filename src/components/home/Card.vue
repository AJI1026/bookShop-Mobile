<template>
  <div class="card">
    <slot>
      <span>公会推荐</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'card-container',
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.card {
  width: 100%;
  text-align: center;
  padding: 20px;
  color: #d4c0a7;
  position: relative;
}
.card span::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: #d4c0a7;
  border-radius: 50%;
  display: block;
  top: 50%;
  left: 40%;
  margin-top: -4px;
}
.card span::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: block;
  background: #d4c0a7;
  top: 50%;
  left: 59%;
  margin-top: -4px;
}
</style>
