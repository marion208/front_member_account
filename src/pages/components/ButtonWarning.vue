<template>
    <button class="button_warning">{{ msg }}</button>
</template>

<script>
export default {
  name: 'ButtonWarning',
  props: {
    msg: String
  }
}
</script>

<style>
.button_warning {
    font-family: "Noto-Bold";
    font-size: 1em;
    margin-top: 1em;
    background-color: #9c0000;
    color: white;
    border-radius: 5px;
    border: 1px solid #767676;
    padding: 0.2em;
}
.button_warning:hover {
    cursor: pointer;
}
</style>
