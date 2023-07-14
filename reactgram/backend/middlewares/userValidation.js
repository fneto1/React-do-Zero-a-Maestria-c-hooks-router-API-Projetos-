const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),

    body("email")
      .isString()
      .withMessage("O email é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido"),

    body("password")
      .isString()
      .withMessage("O senha é obrigatória.")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres"),

    body("confirmPassword")
      .isString()
      .withMessage("A confirmação da senha é obrigatória.")
      //validação customizada
      //a função recebe o valor do campo e a requisição req(destructuring)
      .custom((value, { req }) => {
        if (value != req.body.password) {
          //caso as senhas não sejam iguais, throw error
          throw new Error("As senhas não são iguais");
        }

        //caso sejam iguais, retorna true apenas para sair da condicional
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O email é obrigatório.")
      .isEmail()
      .withMessage("Insira um e-mail válido"),

    body("password").isString().withMessage("O senha é obrigatória."),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres"),

    body("password")
      .optional()
      .isString()
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres"),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
