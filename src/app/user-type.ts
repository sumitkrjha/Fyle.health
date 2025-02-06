export interface workoutType {
  type: string;
  minutes: number;
}
export interface userType {
  id: number;
  name: string;
  workouts: workoutType[];
}
