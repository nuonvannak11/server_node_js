function read_data(data: any) {
    console.log("data====",data);return
  const address = data.address;
  const age = data.age;
  const bankName = data.bankName;
  const bankNumber = data.bankNumber;
  const contactUs = data.contactUs;
  const gender = data.gender;
  const image = data.image;
  const mobileNumber = data.mobileNumber;
  const salary = data.salary;
  const telegram = data.telegram;
  const userid = data.userid;

  return {
    userid,
    telegram,
    salary,
    mobileNumber,
    image,
    address,
    age,
    bankName,
    bankNumber,
    contactUs,
    gender,
  };
}

export function slideData(data: any) {
  return read_data(data);
}
