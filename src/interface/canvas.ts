
export type IForm = 'circle' | 'ellipse' | 'straight' | 'rectangle' | 'polygon' | null

export type IActivity = 'form' | 'text' | 'cut' | 'brush' | null

/**
 * @description 笔刷
 */
export interface BrushStyle {
  bw: number // 边框宽度
  bc: string // 边框颜色
  bs: string // 边框样式
  fc?: string // 填充颜色
}

/**
 * @description 画布尺寸
 */
export interface ICanvasSize {
  width: number
  height: number
}

/**
 * @description 画布对象
 */
export interface Canvas {
  uid: number
  name?: string
  rectangle?: IRectangle
  circle?: ICircle
  line?: ILine
  text?: string
  heart?: IHeart
  image?: Image
  lock?: boolean
  selected?: boolean
}

export interface Image extends Position {
  path: string
  width: number
  height: number,
  img: HTMLImageElement | null
}

/**
 * @description 矩形
 */
export interface IRectangle extends BrushStyle, Position {
  w: number // 宽
  h: number // 高
}

/**
 * @description 线条
 */
export interface ILine {
  x: number // 起点x
  y: number // 起点y
}

/**
 * @description 心形
 */
export interface IHeart extends BrushStyle, Position {
  angle: number
  scaleX: number
  scaleY: number
}

/**
 * @description 圆形
 */
export interface ICircle extends BrushStyle, Position {
  radius: number // 半径
  startAngle: number // 开始角度
  endAngle: number // 结束角度
  anticlockwise: boolean // 是否顺时针
}

export interface Position {
  x: number
  y: number
}