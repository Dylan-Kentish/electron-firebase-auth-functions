const {auth} = require("./firebase");

exports.customToken = (request, response) => {
  return auth.createCustomToken(request.authId)
      .then((authToken) => {
        return response.status(200).send({
          token: authToken,
        });
      });
};

