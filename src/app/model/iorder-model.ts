// To parse this data:
//
//   import { Convert } from "./file";
//
//   const iOrder = Convert.toIOrder(json);

export interface IOrder {
  oid:            number;
  customer_name:   string;
  customer_address: string;
  customer_phone: string;
  status:           string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toIOrder(json: string): IOrder[] {
      return JSON.parse(json);
  }

  public static iOrderToJson(value: IOrder[]): string {
      return JSON.stringify(value);
  }
}
