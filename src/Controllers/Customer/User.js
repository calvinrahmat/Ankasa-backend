const usersMethod = {};
const usersModel = require('../../Models/User');
const response = require('../../Helpers/Response');
const { uploadsUser } = require('../../Helpers/UploadCloud');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hash = require('../../Helpers/Hash');

usersMethod.registerUser = async (req, res) => {
	try {
		const check = await usersModel.getEmail(req.body.email);
		const hashedPass = await hash(req.body.password);
		const data = {
			name: req.body.name,
			email: req.body.email,
			password: hashedPass,
		};
		if (check.length > 0) {
			return response(res, 200, { msg: 'email already registered' });
		}
		const result = await usersModel.addUser(data);
		response(res, 200, result);
	} catch (error) {
		response(res, 400, error);
	}
};

usersMethod.updateProfile = async (req, res) => {
	try {
		// const check = await usersModel.getId(req.body.email);

		// let urlImage = '';
		// const dummyImg =
		// 	'https://res.cloudinary.com/calvin-cloud/image/upload/v1626501995/users/user_meodkb.png';
		// if (check.length <= 0) {
		// 	return response(res, 400, { msg: 'Update error wrong id' });
		// } else if (req.file !== undefined) {
		// 	urlImage = await uploadsUser(req.file.path);
		// }
		const data = {
			id: req.body.id,
			name: req.body.name,
			email: req.body.email,
			address: req.body.address,
			phone: req.body.phone,
			city: req.body.city,
			postcode: req.body.postcode,
		};
		const result = await usersModel.update(data);
		response(res, 200, result);
	} catch (error) {
		console.log(error);
		response(res, 400, error);
	}
};

usersMethod.getUser = async (req, res) => {
	try {
		const result = await usersModel.getEmail(req.body.email);
		result
			? response(res, 200, result)
			: response(res, 400, { msg: 'email not found' });
	} catch (error) {
		console.log(error);
		response(res, 400, { msg: 'email not found' });
	}
};

module.exports = usersMethod;