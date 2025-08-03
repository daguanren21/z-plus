<script setup lang="ts">
import { useMessage } from '../lib/components/Message'

const message = useMessage()

function add() {
  message.add({
    content: 'Hello, this is a message!',
    duration: 3000,
    position: 'top',
    id: Date.now(),
  })
}
</script>

<template>
  <button @click="add">
    add message
  </button>
</template>
