export class Position {
  latitude: number;
  longitude: number;
  zoom: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public isWithin(c: Position, radius: number): boolean;
  public isWithin(latitude: number, longitude: number, radius: number): boolean;

  public isWithin(a: any, b: number, c?: number): boolean {
    let center: Position;
    let radius: number;

    // Method overwriting
    if (a && b && c) {
      center = new Position(a, b);
      radius = c;
    } else {
      center = a;
      radius = b;
    }

    return Position.distance(this, center) < radius;
  }

  // see. https://stackoverflow.com/questions/27928
  public static distance(p1: Position, p2: Position): number {
    let R = 6371;
    let dLat = this.deg2rad(p2.latitude - p1.latitude);
    let dLon = this.deg2rad(p2.longitude - p1.longitude);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(p1.latitude) * Math.cos(this.deg2rad(p2.latitude))) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  public static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
