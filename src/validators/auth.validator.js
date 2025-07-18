const { checkSchema } = require("express-validator");
const handleValidation = require("@/middlewares/handleValidation");
const { User } = require("@/models");

// Password must meet the following criteria:
// - Minimum 8 characters
// - At least one uppercase letter (A–Z)
// - At least one lowercase letter (a–z)
// - At least one digit (0–9)
// - At least one special character (e.g., !@#$%^&*)
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

exports.registerValidator = [
  checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "Email không hợp lệ",
      custom: {
        options: async (value) => {
          const existing = await User.findOne({ where: { email: value } });
          if (existing) {
            throw new Error("Email đã được sử dụng");
          }
          return true;
        },
      },
    },
    password: {
      custom: {
        options: (value) => {
          if (!strongPasswordRegex.test(value)) {
            throw new Error(
              "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
            );
          }
          return true;
        },
      },
    },
    confirmPassword: {
      notEmpty: {
        errorMessage: "Vui lòng nhập lại mật khẩu xác nhận",
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Mật khẩu xác nhận không khớp");
          }
          return true;
        },
      },
    },
    twoFactorEnabled: {
      isBoolean: true,
      optional: true,
      errorMessage: "Trường twoFactorEnabled phải là boolean",
    },
    twoFactorSecret: {
      optional: true,
      isLength: {
        options: { min: 16, max: 32 },
      },
      errorMessage: "Mã 2FA phải có độ dài từ 16–32 ký tự",
    },
    firstName: {
      notEmpty: {
        errorMessage: "Họ không được để trống",
      },
      matches: {
        options: [/^[\p{L} ]+$/u],
        errorMessage: "Họ chỉ được chứa chữ cái và dấu cách",
      },
    },
    lastName: {
      notEmpty: {
        errorMessage: "Tên không được để trống",
      },
      matches: {
        options: [/^[\p{L} ]+$/u],
        errorMessage: "Họ chỉ được chứa chữ cái và dấu cách",
      },
    },
    username: {
      optional: true,
      isAlphanumeric: {
        errorMessage: "Username chỉ được chứa chữ và số",
      },
    },
    avatar: {
      optional: true,
      isURL: {
        errorMessage: "Avatar phải là URL hợp lệ",
      },
    },
    title: {
      optional: true,
      isString: {
        errorMessage: "Tiêu đề phải là chuỗi",
      },
    },
    about: {
      optional: true,
      isString: {
        errorMessage: "About phải là chuỗi",
      },
    },
    postsCount: {
      optional: true,
      isInt: {
        options: { min: 0 },
        errorMessage: "postsCount phải là số nguyên không âm",
      },
    },
    address: {
      optional: true,
      isString: {
        errorMessage: "Địa chỉ phải là chuỗi",
      },
    },
    websiteUrl: {
      optional: true,
      isURL: {
        errorMessage: "websiteUrl phải là URL hợp lệ",
      },
    },
    xUrl: {
      optional: true,
      isURL: {
        errorMessage: "xUrl phải là URL hợp lệ",
      },
    },
    githubUrl: {
      optional: true,
      isURL: {
        errorMessage: "githubUrl phải là URL hợp lệ",
      },
    },
    linkedinUrl: {
      optional: true,
      isURL: {
        errorMessage: "linkedinUrl phải là URL hợp lệ",
      },
    },
    verifiedAt: {
      optional: true,
      isISO8601: {
        errorMessage: "verifiedAt phải là ngày hợp lệ",
      },
    },
  }),
  handleValidation,
];

exports.loginValidator = [
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: "Email hoặc mật khẩu không hợp lệ",
      },
      isEmail: {
        errorMessage: "Email hoặc mật khẩu không hợp lệ",
      },
      normalizeEmail: true,
      custom: {
        options: async (value) => {
          const user = await User.findOne({ where: { email: value } });
          if (!user) {
            throw new Error("Email hoặc mật khẩu không hợp lệ");
          }
          return true;
        },
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Email hoặc mật khẩu không hợp lệ",
      },
    },
  }),
  handleValidation,
];
