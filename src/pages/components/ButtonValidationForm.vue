<template>
    <button class="button_validation_form">{{ msg }}</button>
</template>

<script>
export default {
  name: 'ButtonValidationForm',
  props: {
    msg: String
  }
}
</script>

<style>
.button_validation_form {
    font-family: "Noto-Bold";
    font-size: 1em;
    margin-top: 1em;
}
.button_validation_form:hover {
    cursor: pointer;
}
</style>
