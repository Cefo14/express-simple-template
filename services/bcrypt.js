const bcrypt = require('bcryptjs')

exports.encrypt = (text) => {
	return bcrypt.hashSync(text, 8);
}

exports.compare = async (text, hash) => {
	try
	{
		const result = await bcrypt.compare(text, hash);
		return result
	}

	catch(err)
	{
		throw err
	}
}