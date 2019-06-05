gamelength = 30; //длительность игры в сек
timerID = null //таймер
var playing = false; //логическая переменная для отображения статуса
var numholes = 6 * 10; //кол-во точек на поле
var currentpos = -1; //текущая позиция
/**
 ф-ция для очистки поля
 */
function clrholes() {
    for (var k = 0; k < document.dmz.elements.length; k++)
        document.dmz.elements[k].checked = false;
    return;
}
/**
 ф-ция для сброса таймера
 */
function stoptimer() {
    if (playing) {
        clearTimeout(timerID);
        return;
    }
}
/**
 ф-ция для отоброжения остатка времени
 в качестве аргумента принимает оставшееся врямя раунда
 */
function showtime(remtime) {
    document.cpanel.timeleft.value = remtime;
    if (playing) {
        if (remtime == 0) {
            stopgame();
            return;
        } else {
            temp = remtime - 1;
            timerID = setTimeout("showtime(temp)", 1000);
        }
    }
}
/**
 ф-ция для опредления конца игры
 */
function stopgame() {
    stoptimer();
    playing = false;
    document.cpanel.timeleft.value = 0;
    clrholes();
    display("Игра окончена");
    alert('Игра окончена.\nВаш счет:  ' + totalhits);
    return;
}
/**
 ф-ция для старта игры
 */
function play() {
    stoptimer();
    if (playing) {
        stopgame();
        return;
    }
    playing = true;
    clrholes();
    totalhits = 0;
    document.cpanel.score.value = totalhits;
    display("Идет игра");
    launch();
    showtime(gamelength);
}
/**
 ф-ция для отображения статуса игры(идет в данный момент процесс игры или нет)
 в качестве аргумента принимает логическую переменную, отвечающую за это
 */
function display(msg) {
    document.cpanel.state.value = msg;
    return;
}
/**
 ф-ция для инициализации старта
 */
function launch() {
    var launched = false;
    while (!launched) {
        mynum = random();
        if (mynum != currentpos) {
            document.dmz.elements[mynum].checked = true;
            currentpos = mynum;
            launched = true;
        }
    }
    return;
}
/**
ф-ция для подсчета набранных баллов
в качестве аргумента принимает индекс точки, по которой был совершен клик
*/
function hithead(id) {
    if (playing == false) {
        clrholes();
        display("Нажмите Старт, чтобы играть");
        return;
    }
    if (currentpos != id) {
        totalhits += -1;
        document.cpanel.score.value = totalhits;
        document.dmz.elements[id].checked = false;
    } else {
        totalhits += 1;
        document.cpanel.score.value = totalhits;
        launch();
        document.dmz.elements[id].checked = false;
    }
    return;
}
/**
 рандомайзер
 */
function random() {
    return (Math.floor(Math.random() * 100 % numholes));
}