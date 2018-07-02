var readLine = readline.createInterface(process.stdin, process.stdout);
var readline = require('readline');
var conexao = require('net');
var client = new net.Socket();

readLine.question("Digite seu nome: ", function (name) {

	var mesage = `${name} entrou no chat.`;

	client.connect(5000, '127.0.0.1', function () {
		client.write(message);
	});

	client.on('data', function (data) {
		console.log(String.fromCharCode.apply(null, data));
	});

	client.on('close', function () {
		console.log('Você saiu do chat.');
	});

	readLine.prompt(true);
	readLine.setPrompt(`${name}: `);

	readLine.prompt();
	readLine.on('line', function (message) {
		if (message === "exit") {
			closeChat(name)
		} else {
			client.write(`${name}: ${message}`)
		}
		readLine.prompt();
	}).on('close', function () {
		process.exit(0);
	});
});

function closeChat(name) {
	client.write(`${name} saiu do chat.`);
	client.destroy();
	readLine.close();
}