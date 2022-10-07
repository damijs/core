export default class Console {
    static log(arg) {
        const logMessages = [];
        logMessages.push.apply(logMessages, arg);
        this.logBackup.apply(console, arg);
        return logMessages;
    }
}
Console.logBackup = console.log;
