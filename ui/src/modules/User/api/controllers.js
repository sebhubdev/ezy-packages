const generateAccessToken = require("../helpers/generateAccessToken.js");
const models = require("./models.js");

module.exports = {
  me: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await models.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error });
    }
  },

  login: (req, res) => {


    try {
      const { email, password } = req.body;
      
      // 1) Buscar usuario
      const user = await models.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }

      // 2) Comparar password con bcrypt
      const userId = response[0]?.userId || null;
          const token = generateAccessToken(userId);
      const passwordMatch = password === user.password;
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }

      delete user.password;

      res.json({ message: 'Loged !!', user ,token: `${token}`,});

    } catch (error) {
      res.status(500).json({ message: 'Login error', error });
    }


    
    
  },
};
