// To parse this data:
//
//   import { Convert } from "./file";
//
//   const admin = Convert.toAdmin(json);

export interface Admin {
  aid:      number;
  name:     string;
  email:    string;
  password: string;
  phone:    number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toAdmin(json: string): Admin[] {
      return JSON.parse(json);
  }

  public static adminToJson(value: Admin[]): string {
      return JSON.stringify(value);
  }
}
