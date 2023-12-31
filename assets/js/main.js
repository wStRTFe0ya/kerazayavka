let webhook = 'https://discord.com/api/webhooks/1190930450684854332/iPl3CH1NqAbOyXsULKMAYHdfxTqkNiQIxRrLpx2eORxZ2Q_-dd157N4JzQ3r1LXWEZ0X';

$(document).ready(function() {
	$('#js-form').submit(function(event) {
		let form_content = {
			'age': $('#js-age-input').val(),
			'discord': $('#js-discord-input').val(),
			'nickname': $('#js-nickname-input').val(),
			'description': $('#js-description-input').val()
		};

		if (form_content.age == 'age') {
			Swal.fire({
				title: 'Секундочку 🤔',
				text: 'Возможно вы не указали свой возраст 😥',
				icon: 'question'
			});
			return false;
		}

		// Embed message
		let content = {
			username: 'K&K 🤗',
			avatar_url: 'https://wstrtfe0ya.github.io/kerazayavka/assets/img/avatar.jpg',
			embeds: [{
				title: 'Новая заявка!',
				color: 0x0099ff,
				fields: [
					{ name: 'Ник Minecraft', value: `${form_content.nickname}`, inline: false },
					{ name: 'Ник Discord', value: `${form_content.discord}`, inline: false },
					{ name: 'Возраст', value: `${form_content.age}`, inline: false },
					{ name: 'О себе', value: `${form_content.description}`, inline: false }
				],
				timestamp: new Date().toISOString()
			}]
		};

		sendWebhookMessage(webhook, content);

		event.preventDefault();
	});
});

function sendWebhookMessage(webhook, content) {
	let request = new XMLHttpRequest();

	request.open('POST', webhook, true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.onreadystatechange = () => {
		if (request.readyState === XMLHttpRequest.DONE) {
			const status = request.status;

			$('#js-submit-button').hide();

			if (status === 0 || (status >= 200 && status < 400)) {
				console.log('Message sent successfully!');
				Swal.fire({
 					title: 'Поздравляю! 🥳',
 					text: 'Ваша заявка успешно отправлена 😉',
 					icon: 'success'
				});
			}
		}
	};
	request.send(JSON.stringify(content));
}