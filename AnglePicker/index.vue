<template>
  <div class="angle-picker" :style="angleStyle" @mousedown="onMouseDown">
    <div ref="circle" class="angle-rotater">
      <p class="angle-dot">&nbsp;</p>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
