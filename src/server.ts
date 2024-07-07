import fastify from 'fastify';

const app = fastify();

app.get('/hello', () => 'Hello Tech Challenge');

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log('HTTP Server Running!');
	});
