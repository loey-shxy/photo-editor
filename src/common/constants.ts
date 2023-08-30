import { IForm, IActivity } from "@/interface/canvas"

/**
 * @description 左侧工具栏
 */
export const OPERATION: {[key: string]: { v: IActivity, l: string }} = {
  FORM: { v: 'form', l: '形状' },
  CUT: { v: 'cut', l: '裁剪' },
  TEXT: { v: 'text', l: '文本' },
  BRUSH: { v: 'brush', l: '画笔' },
}

/**
 * @description 线段类型
 */
export const LINE_STYLES = {
  SOLID: { v: 'solid', l: '实线' },
  DASHED: { v: 'dashed', l: '虚线' }
}

/**
 * @description 线段末端形状
 */
export const LINE_CAP = {
  BUTT: { v: 'butt', l: '方形' },
  ROUND: { v: 'round', l: '圆形' },
  SQUARE: { v: 'square', l: '正方形' },
}

/**
 * @description 形状
 */
export const FORM: {[key: string]: { v: IForm, l: string }} = {
  CIRCLE: { v: 'circle', l: '圆形' },
  ELLIPSE: { v: 'ellipse', l: '椭圆' },
  STRAIGHT: { v: 'straight', l: '三角形' },
  RECTANGLE: { v: 'rectangle', l: '矩形' },
  POLYGON: { v: 'polygon', l: '多边形' }
}


export const DRAG_STATUS = {
  IDLE: 0, // 拖拽开始
  DRAG_START: 1, // 拖拽中
  DRAGGING: 2 // 拖拽结束
}