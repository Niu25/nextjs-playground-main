import jwt, { JwtPayload } from "jsonwebtoken";




/*  const DEFAULT_SIGN_OPTION={
    expiresIn: '1h'
};  */


export function signJwtAccessToken(payload){


//const payload = JwtPayload;
const secretKey = process.env.SECRET_KEY;
const token = jwt.sign(payload, secretKey,{ expiresIn: '1h' });
const verificationLink = `https://localhost:3000/register/verify?token=${token}`;


//const options = DEFAULT_SIGN_OPTION;

//console.log('JWT Token:', token);

return token, verificationLink;
}

export function verifyJwt(token){
try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
    
} catch (error) {
    console.log(error);
    return null;
    
}
}

/* function MyComponent() {
    return (
      <div>
        <p>Token expiration time: {DEFAULT_SIGN_OPTION.expiresIn}</p>
      </div>
    );
  }
  
  export default MyComponent; */