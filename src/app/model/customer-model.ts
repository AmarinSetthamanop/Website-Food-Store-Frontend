// To parse this data:
//
//   import { Convert } from "./file";
//
//   const customer = Convert.toCustomer(json);

export interface Customer {
  cid:      number;
  name:     string;
  phone:    number;
  address:  string;
  email:    string;
  password: number | string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCustomer(json: string): Customer[] {
      return JSON.parse(json);
  }

  public static customerToJson(value: Customer[]): string {
      return JSON.stringify(value);
  }
}
