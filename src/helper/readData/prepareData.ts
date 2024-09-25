function read_data(datafromuser: any, datafromdatabase: any) {
  Object.keys(datafromuser).forEach((key) => {
    if (datafromuser[key] === "") {
      datafromuser[key] = datafromdatabase[key];
    }
  });

  return datafromuser;
}

export function PrepareDataBeforeUpdate(
  datafromuser: any,
  datafromdatabase: any
) {
  return read_data(datafromuser, datafromdatabase);
}
