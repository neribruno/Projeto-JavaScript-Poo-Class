let log = new Log(document.querySelector('.log'));

let char = new Knight('');

let mob = new Goblin('Goblin');

const estagio = new Stage(
    char,
    mob,
    document.querySelector('#char'),
    document.querySelector('#mob'),
    log,
);

estagio.start();


