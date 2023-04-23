const rinseMessages = (messages) => {

    const now = Date.now();
    const oneHour = 3600000;

    for (let i = 0; i < messages.length; i++) {

        if (messages[i].time + oneHour < now) {

            messages.splice(i, 1);
            i--;

        }
    }
}

export default rinseMessages;