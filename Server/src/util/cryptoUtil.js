import bcrypt from 'bcrypt';
import "babel-polyfill";
const saltRounds = 10;
const hash = async (text) => bcrypt.hash(text, saltRounds);
const compare = async (text, hashed) => bcrypt.compare(text, hashed);

export default { compare, hash };
