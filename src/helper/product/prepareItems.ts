function fallbackData<T extends Record<string, any>>(data: T): Partial<T> {
  if (typeof data !== "object" || data === null) {
    return data;
  }
  const result: Partial<T> = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== null && data[key] !== "") {
        result[key] = data[key];
      }
    }
  }
  return result;
}

function findData<T extends Record<string, any>>(data: T): Partial<T> {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  const result = { ...data } as T;

  const pairs = [
    ["item_weight", "item_weight_price"],
    ["item_color", "item_color_price"],
    ["item_size", "item_size_price"],
  ];

  pairs.forEach(([key1, key2]) => {
    if (result[key1] !== undefined && result[key2] !== undefined) {
      (result as any)[key1] = mergeData(result[key1], result[key2]);
      delete result[key2];
    }
  });

  return result as Partial<T>;
}

function mergeData(data1: string, data2: string): { [key: string]: number }[] {
  const item = data1.split("#");
  const price = data2.split("#").map(Number);
  const result = item.map((color, index) => ({ [color]: price[index] }));
  return result;
}

function prepare(data: any) {
  const data1 = fallbackData(data);
  const datamerg = findData(data1);
  const itemData: any = {};
  Object.keys(datamerg).forEach((key) => {
    if (key.startsWith("item_")) {
      itemData[key] = datamerg[key];
    }
  });
  return itemData;
}

export default function PrepareItems(data: any) {
  return prepare(data);
}
