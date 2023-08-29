
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
  file?: File
  lock?: boolean
  selected?: boolean
}

export interface File {
  path: string
  x: number
  y: number
  width: number
  height: number,
  img: HTMLImageElement | null
}

/**
 * @description 矩形
 */
export interface IRectangle extends BrushStyle {
  x: number // 起点x坐标
  y: number // 起点y坐标
  w: number // 宽
  h: number // 高
}

/**
 * @description 线条
 */
export interface ILine {
  sx: number // 起点x
  sy: number // 起点y
  ex: number // 终点x
  ey: number // 终点y
}

/**
 * @description 心形
 */
export interface IHeart extends BrushStyle {
  x: number // 结束点 x 坐标
  y: number // 结束点 y 坐标
  angle: number
  scaleX: number
  scaleY: number
}

/**
 * @description 圆形
 */
export interface ICircle extends BrushStyle {
  x: number // 圆心x坐标
  y: number // 圆心y坐标
  radius: number // 半径
  startAngle: number // 开始角度
  endAngle: number // 结束角度
  anticlockwise: boolean // 是否顺时针
}

export interface Position {
  x: number
  y: number
}