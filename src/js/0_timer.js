const gameTimer = {
    'time': 0,
    'enabled': false,

    //Methods

    'start': () => {
        gameTimer.time = 0;
        gameTimer.enabled = true;
        setTimeout(gameTimer.second, 1000)
        document.getElementById('timer').innerHTML = gameTimer.timestr();
    },

    'halt': () => {
        gameTimer.enabled = false;
    },

    'second': () => {
        if (gameTimer.enabled) {
            gameTimer.time += 1;
            setTimeout(gameTimer.second, 1000);
        }

        document.getElementById('timer').innerHTML = gameTimer.timestr();
    },

    'timestr': () => {
        let hrs, min, sec;
        sec = gameTimer.time;

        min = Math.floor(sec / 60);
        sec %= 60;
        if(sec < 10)
            sec = `0${sec}`;

        hrs = Math.floor(min / 60);
        min %= 60;
        if(min < 10)
            min = `0${min}`;

        let strformat;
        if (hrs === 0)
            strformat = `${min}:${sec}`;
        else {
            if(hrs < 10)
                hrs = `0${sec}`;
            strformat = `${hrs}:${min}:${sec}`;
        }

        return strformat;
    }
};