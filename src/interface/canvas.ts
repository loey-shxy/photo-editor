
export type IForm = 'circle' | 'ellipse' | 'straight' | 'rectangle' | 'polygon' | null

export type IActivity = 'form' | 'text' | 'cut' | 'brush' | null

export interface ICanvasSize {
  width: number
  height: number
}

export interface Canvas {
  uid: number
  name?: string
  rectangle?: IRectangle
  line?: ILine
  text?: string
  lock?: boolean
}

/**
 * @description 矩形
 */
export interface IRectangle {
  x: number // 起点x坐标
  y: number // 起点y坐标
  w: number // 宽
  h: number // 高
  bw: number // 边框宽度
  bc: string // 边框颜色
  bs: string // 边框样式
  fc: string // 填充颜色
}

export interface ILine {
  sx: number // 起点x
  sy: number // 起点y
  ex: number // 终点x
  ey: number // 终点y
}