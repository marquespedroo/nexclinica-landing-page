export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface ParticleData {
  initialPos: Position;
  currentPos: Position;
  velocity: Position;
  phase: number;
}