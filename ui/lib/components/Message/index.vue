<script  lang="ts">
import type { CSSProperties, VNode } from 'vue'
import { provide } from 'vue'
import { useMessageConfig } from './message'

export type Position = 'top' | 'bottom'

export interface MessageProps {
  style?: CSSProperties
  className?: string | string[]
  content: VNode | string
  duration?: number
  id?: number
  position?: Position
}
</script>

<script setup lang="ts">
defineOptions({
  name: 'ZMessage',
})

const messageConfig = useMessageConfig('top')
const { messageList } = messageConfig
const positions = Object.keys(messageList.value) as Position[]

// 通过 defineExpose 暴露所有消息相关方法和属性
defineExpose(messageConfig)
provide('messageConfig', messageConfig)
</script>

<template>
  <div>
    <Teleport to="body">
      <div class="message-wrapper">
        <transition-group v-for="position in positions" :key="position" name="message">
          <div v-for="value in messageList[position]" :key="value.id" class="message-item">
            {{ value.content }}
          </div>
        </transition-group>
      </div>
    </Teleport>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.message-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;

  pointer-events: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &-top {
    position: absolute;
    top: 20px;
  }

  &-bottom {
    position: absolute;
    bottom: 20px;
  }
}

.message-item {
  margin-bottom: 12px;

  padding: 10px 16px;
  line-height: 14px;
  font-size: 14px;

  border: 1px solid #ccc;
  box-shadow: 0 0 3px #ccc;

  pointer-events: all;
}

.message-enter-active,
.message-leave-active {
  transition:
    opacity 0.3s,
    transform 0.4s,
    top 0.4s;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
