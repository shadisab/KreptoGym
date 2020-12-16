const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.sendgridAPIkey);


const sendmsg = (to, subject, text) => {
	sendgrid.send({
		to: to,
		from: 'kreptogym@gmail.com',
		subject: subject,
		text: text
	});
};

module.exports = {
	sendmsg
};
