import { Position } from '@/interface/canvas'

/**
 * @description 计算两点之间的距离
 * @param p1 
 * @param p2 
 * @returns 
 */
export const getDistance = (p1: Position, p2: Position) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}