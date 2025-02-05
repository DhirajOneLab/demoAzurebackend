const jwt = require('jsonwebtoken'); 
const jwksRsa = require('jwks-rsa');

const jwtVerifyMiddleware = (req, res, next) => {
const token = req.headers.authorization.split(' ')[1]; 
const client = jwksRsa({
jwksUri:'https://login.microsoftonline.com/6eb207c9-b859-45fa-8497-a892dc94f36c/v2.0/.well-known/openid'
});


const getKey = (header, callback) => {
	client.getSigningKey(header.kid, (err, key) => {
	if (err) {
		return callback(err);
}
	const signingKey = key.publicKey || key.rsaPublicKey; 
callback(null, signingKey);
});
};

jwt.verify(token, getKey, {
    audience: '8e40700d-9c6e-4344-af34-77f7622e81c4',
    issuer: 'https://login.microsoftonline.com/6eb207c9-b859-45fa-8497-a892dc94f36c/v2.0/'
}, (err, decoded) => {
    if (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
});
};

module.exports = jwtVerifyMiddleware;
