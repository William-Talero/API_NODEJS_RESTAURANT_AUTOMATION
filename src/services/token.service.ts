import { generateToken } from "../utils/jwt.handle";

const getToken = () => {
    return generateToken("user");
}

export default { getToken };