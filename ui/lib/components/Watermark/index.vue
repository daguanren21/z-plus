<script lang="ts">
import type { CSSProperties } from 'vue'
import { computed, onMounted, useTemplateRef, watchEffect } from 'vue'
import useWatermark from './useWatermark'

export interface ZWatermarkProps {
  style?: CSSProperties
  zIndex?: string | number
  width?: number
  height?: number
  rotate?: number
  image?: string
  content?: string | string[]
  fontStyle?: {
    color?: string
    fontFamily?: string
    fontSize?: number | string
    fontWeight?: number | string
  }
  gap?: [number, number]
  offset?: [number, number]
  getContainer?: () => HTMLElement
}
</script>

<script setup lang="ts">
defineOptions({
  name: 'ZWatermark',
})
const props = defineProps<ZWatermarkProps>()
const {
  style,
  zIndex,
  width,
  height,
  rotate,
  image,
  content,
  fontStyle,
  gap,
  offset,
} = props
const containerElement = useTemplateRef('containerRef')
const getContainer = computed(() => props.getContainer ? props.getContainer() : containerElement.value)

onMounted(() => {
  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer: () => getContainer.value!,
  })
  watchEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer: () => getContainer.value!,
    })
  })
})
</script>

<template>
  <div ref="containerRef" :style="[style]">
    <slot />
  </div>
</template>

<style scoped>

</style>
