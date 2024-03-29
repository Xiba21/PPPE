﻿/**
 * @author Alexander Rozinkov
 */
/**
 * длительность раунда
 * @constant {number}
 */
gamelength = 30;
/**
 * таймер
 */
timerID = null
/**
 * переменная для отображения статуса игры
 * @var {bool}
 */
var playing = false;
/**
 * количество точек на игровом поле
 * @var {number} 
 */
var numholes = 6 * 10;
/**
 * переменная для определения текущей позиции активной точки
 * @var {number}
 */
var currentpos = -1;
/**
 * ф-ция для очистки поля
 * @return void
 */
function clrholes() {
    for (var k = 0; k < document.dmz.elements.length; k++)
        document.dmz.elements[k].checked = false;
    return;
}
/**
 * ф-ция для сброса таймера
 * @return void
 */
function stoptimer() {
    if (playing) {
        clearTimeout(timerID);
        return;
    }
}
/**
 * ф-ция для отоброжения остатка времени
 * param {number} remtime
 * @return void
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
 * ф-ция для опредления конца игры
 * @return void
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
 * ф-ция для старта игры
 * @return void
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
 * ф-ция для отображения статуса игры(идет в данный момент процесс игры или нет)
 * param {number} msg
 * @return void
 */
function display(msg) {
    document.cpanel.state.value = msg;
    return;
}
/**
 * ф-ция для инициализации старта
 * @return void
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
 * ф-ция для подсчета набранных баллов
 * param {number} id
 * @return void
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
 * рандомайзер
 * @return number
 */
function random() {
    return (Math.floor(Math.random() * 100 % numholes));
}