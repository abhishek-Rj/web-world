export interface playerDetailSchema {
  id?: string;
  x: number;
  y: number;
}

export interface gameRoom {
  players: Map<string, playerDetailSchema>;
}
