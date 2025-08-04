import { vi } from 'vitest'

// Mock Canvas API for testing environment
const mockCanvas = {
  getContext: vi.fn(() => ({
    font: '',
    fillStyle: '',
    textBaseline: '',
    measureText: vi.fn(() => ({
      width: 100,
      fontBoundingBoxAscent: 10,
      fontBoundingBoxDescent: 5,
    })),
    fillText: vi.fn(),
    drawImage: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    translate: vi.fn(),
  })),
  setAttribute: vi.fn(),
  toDataURL: vi.fn(() => 'data:image/png;base64,mock'),
  style: {},
}

// Mock document.createElement for canvas
const originalCreateElement = document.createElement
document.createElement = vi.fn((tagName: string) => {
  if (tagName === 'canvas') {
    return mockCanvas as any
  }
  return originalCreateElement.call(document, tagName)
})

// Mock Image constructor
globalThis.Image = class {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  src = ''
  width = 100
  height = 100

  constructor() {
    setTimeout(() => this.onload?.(), 0)
  }
} as any

// Mock devicePixelRatio
Object.defineProperty(window, 'devicePixelRatio', { value: 1 })
