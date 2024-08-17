// To parse this data:
//
//   import { Convert } from "./file";
//
//   const type = Convert.toType(json);

export interface Type {
  tid:  number;
  name: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toType(json: string): Type[] {
      return JSON.parse(json);
  }

  public static typeToJson(value: Type[]): string {
      return JSON.stringify(value);
  }
}
