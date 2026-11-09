module.exports = (context, basicIO) => {
    // Basic I/O functions receive Context and BasicIO objects
    const name = basicIO.getArgument('name') || 'Guest';

    const response = {
        message: `Hello ${name} from Basic I/O function!`,
        timestamp: Date.now()
    };

    basicIO.write(JSON.stringify(response));
    context.close();
};
