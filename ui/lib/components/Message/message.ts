import type { MessageProps, Position } from '.'
import { getCurrentInstance, inject, onMounted, onUnmounted, ref, useId } from 'vue'

interface MessageList {
  top: MessageProps[]
  bottom: MessageProps[]
}

const initialState = {
  top: [],
  bottom: [],
}
export function getMessagePosition(messageList: MessageList, id: number) {
  for (const [position, list] of Object.entries(messageList)) {
    // @ts-ignore
    if (list.find(item => item.id === id)) {
      return position as Position
    }
  }
}

export function findMessage(messageList: MessageList, id: number) {
  const position = getMessagePosition(messageList, id)

  const index = position ? messageList[position].findIndex(message => message.id === id) : -1

  return {
    position,
    index,
  }
}
export function useMessageConfig(defaultPosition: Position) {
  const messageList = ref<MessageList>({ ...initialState })
  const id = useId()

  return {
    messageList,
    add: (messageProps: MessageProps) => {
      if (messageProps?.id) {
        const position = getMessagePosition(messageList.value, messageProps.id)
        if (position) {
          console.error(`Message with id ${messageProps.id} already exists at position ${position}.`)
        }
      }
      const position = messageProps.position || defaultPosition
      const isTop = position.includes('top')
      const messages = isTop
        ? [{ ...messageProps, id }, ...(messageList.value[position] ?? [])]
        : [...(messageList.value[position] ?? []), { ...messageProps, id }]
      messageList.value = { ...messageList.value, [position]: messages }
      return id
    },

    update: (id: number, messageProps: MessageProps) => {
      if (!id) {
        return
      }

      const { position, index } = findMessage(messageList.value, id)
      if (position && index !== -1) {
        messageList.value[position][index] = {
          ...messageList.value[position][index],
          ...messageProps,
        }
      }
    },

    remove: (id: number) => {
      const position = getMessagePosition(messageList.value, id)
      if (!position) {
        return
      }
      messageList.value[position] = messageList.value[position].filter(message => message.id !== id)
    },

    clearAll: () => {
      messageList.value = { ...initialState }
    },
  }
}
export type MessageConfig = ReturnType<typeof useMessageConfig>
export function useMessage(): MessageConfig {
  const vm = getCurrentInstance()
  const context = inject('messageConfig') as MessageConfig
  console.log(context, vm)
  if (!context) {
    throw new Error('请在最外层添加 ConfigProvider 组件')
  }

  return context
}
export interface UseTimerProps {
  id: number
  duration?: number
  remove: (id: number) => void
}
export function useTimer(props: UseTimerProps) {
  const { remove, id, duration = 2000 } = props

  const timer = ref<number | null>(null)

  const startTimer = () => {
    timer.value = window.setTimeout(() => {
      remove(id)
      removeTimer()
    }, duration)
  }

  const removeTimer = () => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }

  onMounted(() => {
    startTimer()
  })

  onUnmounted(() => {
    removeTimer()
  })
  const onMouseEnter = () => {
    removeTimer()
  }

  const onMouseLeave = () => {
    startTimer()
  }

  return {
    onMouseEnter,
    onMouseLeave,
  }
}
