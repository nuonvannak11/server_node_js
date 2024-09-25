import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import UserCode from "../models/userModelCode";
import UserColor from "../models/userModelColor";
import { io } from "../helper/socket";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decryptPassword } from "../utils/helperFunctions";
import { ConvertDataDecripts } from "../helper/decripts/decriptsData";
import { convertData } from "../helper/readData/convert";
import { convertDecript } from "../helper/returnDecript/readDecript";
import { getCurrentDateTime } from "../helper/datetime/dateUntil";
import { PrepareDataBeforeUpdate } from "../helper/readData/prepareData";
import { RandomNumber } from "../helper/randomNumber/random";
import { SendUserCode } from "../utils/message/email/sendEmail";
import { GetAddressTimeZone } from "../helper/glable/post/address";
import { slideData } from "../helper/readData/slideData";
import { config } from "dotenv";
import { exit } from "process";

config();

const secretKey = process.env.JWT_SECRET_KEY || "";

interface UserInstance extends User {
  hashedPassword: string;
}

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await User.findAll();
    io.emit("newUsers", allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const regex = /(\d+)#(.+)/;
    const match_user = decryptPassword(username).data.match(regex);
    const match_password = decryptPassword(password).data.match(regex);
    let passwordUser: string | undefined;
    let usernameUser: string | undefined;
    if (match_user) {
      const code_user = parseInt(match_user[1], 10);
      const data_user = match_user[2];
      if (code_user === -500 || code_user === -10) {
        res.status(200).json({ message: data_user, code: -1 });
        return;
      }
      if (code_user === 200) {
        usernameUser = data_user;
      }
    } else {
      res.status(200).json({
        code: -1,
        message: "Decryption Username Failed",
      });
      return;
    }

    if (match_password) {
      const code_password = parseInt(match_password[1], 10);
      const data_password = match_password[2];
      if (code_password === -500 || code_password === -10) {
        res.status(200).json({ message: data_password, code: -1 });
        return;
      }
      if (code_password === 200) {
        passwordUser = data_password;
      }
    } else {
      res.status(200).json({
        code: -1,
        message: "Decryption Password Failed",
      });
      return;
    }

    try {
      const datauser = await User.findOne({
        where: { name: usernameUser },
      });

      if (!datauser) {
        res.status(200).json({ code: -1, message: "Username not found" });
        return;
      }
      const userData = datauser.get();
      if (userData.name.toString() !== usernameUser) {
        res.status(200).json({
          code: -1,
          message: "Username does not match",
        });
        return;
      }

      if (passwordUser !== userData.password.toString()) {
        res.status(200).json({
          code: -1,
          message: "Password does not match",
        });
        return;
      }

      const token = jwt.sign({ id: userData.id }, secretKey, {
        expiresIn: "8760h",
      });

      const data = convertData(userData);
      res.status(200).json({
        code: 1,
        message: "Login successful",
        token: token,
        datauser: data,
      });
    } catch (error) {
      res.status(200).json({
        code: -1,
        message: "Something When Wronge During Login",
        error: error,
      });
      console.error("Error logging in:", error);
    }
  } catch (error) {
    res.status(200).json({
      code: -1,
      message: "Invalid Data",
      error: error,
    });
    console.error("Error logging in:", error);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;
  const decryptedPassword = decryptPassword(password);
  const decryptedEmail = decryptPassword(email);
  const passwordDecrypted = convertDecript(decryptedPassword, "password");
  const emailDecrypted = convertDecript(decryptedEmail, "email");
  let passwordDecript: string | undefined;
  let emailDecript: string | undefined;

  if (passwordDecrypted.code === "-1" || emailDecrypted.code === "-1") {
    res.status(200).json({
      message: "Try again, bruh!",
      code: "-1",
    });
    return;
  }
  if (passwordDecrypted.code === "-2" || emailDecrypted.code === "-2") {
    res.status(200).json({
      message: "ERR_OSSL_BAD_DECRYPT",
      code: "-1",
    });
    return;
  }
  if (passwordDecrypted.code === "1" || emailDecrypted.code === "1") {
    passwordDecript = passwordDecrypted.data;
    emailDecript = emailDecrypted.data;
  }

  if (!passwordDecript) {
    res.status(200).json({
      message: "Password decryption failed",
      code: "-1",
    });
    return;
  }

  if (!emailDecript) {
    res.status(200).json({
      message: "Email decryption failed",
      code: "-1",
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailDecript)) {
    res.status(200).json({
      message: "Invalid email format",
      code: "-1",
    });
    return;
  }
  try {
    const user = await User.findOne({
      where: { name: username },
    });
    if (user) {
      res.status(200).json({
        message: "Username Aleady Exist!",
        code: "-1",
      });
      return;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(200).json({ error: "Internal server error" });
  }

  try {
    const newUser = await User.create({
      name: username,
      password: passwordDecript,
      email: emailDecript,
    });

    if (!newUser) {
      res.status(200).json({
        message: "User error creating!",
        code: "-1",
      });
      return;
    }

    const user = (await User.findOne({
      where: { name: username },
    })) as UserInstance;
    const token = jwt.sign({ id: user.dataValues.id }, secretKey, {
      expiresIn: "8760h",
    });
    const data = convertData(user);
    io.emit("newUsers", await User.findAll());

    res.status(200).json({
      message: "Register successful",
      code: "1",
      token: token,
      datauser: data,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(200).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    if (deletedUser) {
      io.emit("newUsers", await User.findAll());
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUsers = async (req: Request, res: Response): Promise<void> => {
  const { data } = req.body;
  if (data) {
    const encrypted_data = data.encrypted;
    const token_id = data.tokenUser.token;
    let data_token: string | JwtPayload;
    try {
      const deCoded = jwt.verify(token_id, secretKey) as JwtPayload;
      data_token = deCoded;
    } catch (error) {
      res.status(200).json({
        code: -1,
        message: "Unauthorized Access",
        error: error,
      });
      return;
    }
    const id_user = (data_token as JwtPayload).id;
    const find_user = await User.findOne({
      where: { id: id_user },
    });
    if (find_user) {
      const { prepareData, errorData } = ConvertDataDecripts(encrypted_data);
      if (errorData.length > 0) {
        const entries = Object.entries(errorData[0]);
        res.status(200).json({
          code: -1,
          message: `${entries[0][0]} # ${entries[0][1]}`,
        });
        return;
      }

      if (prepareData && Array.isArray(prepareData) && prepareData.length > 0) {
        const data = prepareData;
        let convert: Record<string, any> = {};
        data.forEach((item) => {
          const key = Object.keys(item)[0];
          convert[key] = item[key];
        });

        const datetime = getCurrentDateTime();
        const userData = find_user.get();
        const dataprepared = PrepareDataBeforeUpdate(convert, userData);

        try {
          const [numberOfAffectedRows] = await User.update(
            {
              tel: dataprepared.tel,
              age: dataprepared.age,
              gender: dataprepared.gender,
              address: dataprepared.address,
              telegram: dataprepared.telegram,
              bankacc: dataprepared.bankacc,
              bankno: dataprepared.bankno,
              salary: dataprepared.salary,
              contact_us: dataprepared.contact_us,
              image: dataprepared.image,
              update_at: datetime,
            },
            { where: { id: id_user } }
          );

          if (numberOfAffectedRows === 0) {
            res.status(200).json({
              code: -1,
              message: "Fail Update Information!",
            });
            return;
          }

          const newuserupdate = await User.findOne({
            where: { id: id_user },
          });

          if (!newuserupdate) {
            res.status(200).json({
              code: -1,
              message: "User Not Found!",
            });
            return;
          }
          const userDataNew = convertData(newuserupdate.get());
          res.status(200).json({
            code: 1,
            message: "User updated successfully!",
            datauser: userDataNew,
          });
        } catch (error) {
          console.log(error);
          res.status(200).json({
            code: -1,
            message: "Error updating user",
          });
        }
      } else {
        res.status(200).json({
          code: -1,
          message: "Error updating user",
        });
      }
    } else {
      res.status(200).json({
        code: -1,
        message: "User Not Found!",
      });
      return;
    }
  } else {
    res.status(200).json({
      code: -1,
      message: "Faild Access",
      error: "Errors Return Data",
    });
    return;
  }
};

const restoreUser = async (req: Request, res: Response): Promise<void> => {
  const { data } = req.body;
  const { prepareData, errorData } = ConvertDataDecripts(data);
  const datetime = getCurrentDateTime();
  try {
    if (data) {
      if (errorData.length > 0) {
        const entries = Object.entries(errorData[0]);
        res.status(200).json({
          error: `${entries[0][0]} # ${entries[0][1]}`,
          code: "-1",
        });

        return;
      }

      if (prepareData && Array.isArray(prepareData) && prepareData.length > 0) {
        const data = prepareData;
        let convert: Record<string, any> = {};
        data.forEach((item) => {
          const key = Object.keys(item)[0];
          convert[key] = item[key];
        });

        if (convert.type === "first") {
          const user = await User.findOne({
            where: { name: convert.username },
          });

          if (!user) {
            res.status(200).json({ message: "User not found", code: "-1" });
            return;
          }

          res
            .status(200)
            .json({ message: "User found", code: "1", type: "second" });
          return;
        }

        const user = await User.findOne({
          where: { name: convert.username },
        });

        if (!user) {
          res.status(200).json({ message: "User not found", code: "-1" });
          return;
        }
        const userData = user.get();

        if (convert.type === "second") {
          const codedata = RandomNumber(6);
          const email = userData.email;
          const code_confirm = codedata;
          const username = userData.name;

          try {
            const response = await SendUserCode(email, code_confirm, username);

            if (response.code === "1") {
              const search_data = await UserCode.findOne({
                where: { userid: userData.id },
              });

              if (search_data) {
                const restoreCode = await UserCode.update(
                  {
                    code: code_confirm,
                    password: convert.password,
                    session: "allowType",
                  },
                  { where: { userid: userData.id } }
                );
                console.log("udateCode=", restoreCode);
              } else {
                const restoreCode = await UserCode.create({
                  userid: userData.id,
                  password: convert.password,
                  code: code_confirm,
                  session: "allowType",
                });
                console.log("restoreCode=", restoreCode);
              }

              res.status(200).json({
                message: "successful",
                code: "1",
                data: `Code 6digit has been send to email#${userData.email}`,
                type: "third",
              });
              return;
            }

            if (response.code === "-1") {
              res.status(200).json({
                message: "problem",
                code: "-1",
                data: `can't send code 6digit to email#${userData.email}`,
              });
              return;
            }
          } catch (error) {
            console.error("Error:", error);
            res
              .status(200)
              .json({ message: "problem", code: "-1", error: error });
          }
        }

        if (convert.type === "third") {
          try {
            const search_data = await UserCode.findOne({
              where: { userid: userData.id },
            });

            if (!search_data) {
              res
                .status(200)
                .json({ message: "not found data in third case", code: "-1" });
              return;
            }

            const datauser = search_data.get();
            const datacode = parseInt(convert.datacode);
            const datacodeuser = parseInt(datauser.code, 10);

            if (datacodeuser !== datacode) {
              res.status(200).json({ message: "code not match", code: "-1" });
              return;
            }

            const updatePassword = await User.update(
              {
                password: datauser.password,
                update_at: datetime,
              },
              { where: { id: userData.id } }
            );

            if (!updatePassword) {
              res
                .status(200)
                .json({ message: "fail update password", code: "-1" });
              return;
            }

            const uerUpdate = await User.findOne({
              where: { id: userData.id },
            });

            if (!uerUpdate) {
              res.status(200).json({ message: "User not found", code: "-1" });
              return;
            }

            const data_update = uerUpdate.get();
            const email = data_update.email;
            const code_confirm = "success";
            const username = data_update.name;

            try {
              const response = await SendUserCode(
                email,
                code_confirm,
                username
              );

              const token = jwt.sign({ id: data_update.id }, secretKey, {
                expiresIn: "8760h",
              });
              const data = convertData(data_update);

              if (response.code === "1") {
                res.status(200).json({
                  message: "successful",
                  code: "1",
                  data: "Successful Update",
                  type: "foure",
                  token: token,
                  datauser: data,
                });
                return;
              }

              if (response.code === "-1") {
                res.status(200).json({
                  message: "problem",
                  code: "-1",
                  data: "can't send email data",
                });
                return;
              }
            } catch (error) {
              console.error("Error:", error);
              res.status(200).json({
                message: "problem",
                code: "-1",
                error: error,
              });
            }
          } catch (error) {
            console.error("Error:", error);
            res.status(200).json({
              message: "problem",
              code: "-1",
              error: error,
            });
          }
        }
      }
    } else {
      res.status(200).json({
        message: "not found data first case",
        code: "-1",
      });
      return;
    }
  } catch (error) {
    console.error("Error restore user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//FOLLOW USER BY ID
const updateUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const updatedUser = await User.update(
      { name, email },
      { where: { id: userId } }
    );

    if (updatedUser[0]) {
      io.emit("newUsers", await User.findAll());
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getColor = async (req: Request, res: Response): Promise<void> => {
  const { nameColor, tokenId, ip } = req.body;
  console.log("ip_user==", ip);
  let data: string | JwtPayload;
  try {
    const decoded = jwt.verify(tokenId, secretKey) as JwtPayload;
    data = decoded;
  } catch (error) {
    res.status(200).json({
      code: -1,
      message: "Unauthorized Access",
      error: error,
    });
    return;
  }
  const id_user = (data as JwtPayload).id;
  const checkUser = await User.findOne({ where: { id: id_user } });
  const datetime = getCurrentDateTime().toString();
  if (checkUser) {
    const checkUserColor = await UserColor.findOne({
      where: { userid: id_user },
    });
    if (checkUserColor) {
      const update_color = await UserColor.update(
        {
          color_theme: nameColor,
          update_at: datetime,
        },
        { where: { userid: id_user } }
      );
      if (update_color) {
        res.status(200).json({
          code: 1,
          message: "Change Theme Successful!",
          data: nameColor,
        });
        return;
      } else {
        res.status(200).json({
          code: -1,
          message: "Error Update Theme!",
        });
        return;
      }
    } else {
      const create_color = await UserColor.create({
        userid: id_user,
        color_theme: nameColor,
        create_at: datetime,
        update_at: datetime,
      });
      if (create_color) {
        res.status(200).json({
          code: 1,
          message: "Change Theme Successful!",
          data: nameColor,
        });
        return;
      } else {
        res.status(200).json({
          code: -1,
          message: "Error Create Theme!",
        });
        return;
      }
    }
  } else {
    res.status(200).json({ code: -1, message: "User Not Found!" });
    return;
  }
};

const UserController = {
  getAllUsers,
  loginUser,
  createUser,
  deleteUser,
  updateUserById,
  updateUsers,
  restoreUser,
  getColor,
};

export default UserController;
