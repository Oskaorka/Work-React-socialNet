export function displayDate(data) {
    const t = Date.parse(new Date()) - data;
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const arrMinOne = [1, 21, 31, 41, 51];
    const arrMinTwo = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54];
    const findeNum = (arr, dt) => {
        return arr.indexOf(dt) !== -1;
    };
    if (days === 0) {
        if (hours < 1) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${minutes} минуты`;
            }
            return `${minutes} минут`;
        }
        if (findeNum(arrMinOne, hours) === true) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${hours} час ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${hours} час ${minutes} минуты`;
            }
            return `${hours} час ${minutes} минут`;
        }
        if (findeNum(arrMinTwo, hours) === true) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${hours} часа ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${hours} часа ${minutes} минуты`;
            }
            return `${hours} часа ${minutes} минут`;
        }
        return `${hours} часов ${minutes} минут`;
    }
    // 1
    if (findeNum(arrMinOne, days) === true) {
        if (hours < 1) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${days} день ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${days} день ${minutes} минуты`;
            }
            return `${days} день ${minutes} минут`;
        }
        if (findeNum(arrMinOne, hours) === true) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${days} день ${hours} час ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${days} день ${hours} час ${minutes} минуты`;
            }
            return `${days} день ${hours} час ${minutes} минут`;
        }
        if (findeNum(arrMinTwo, hours) === true) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${days} день ${hours} часа ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${days} день ${hours} часа ${minutes} минуты`;
            }
            return `${days} день ${hours} часа ${minutes} минут`;
        }
        if (findeNum(arrMinOne, minutes) === true) {
            return `${days} день ${hours} часов ${minutes} минуту`;
        }
        if (findeNum(arrMinTwo, minutes) === true) {
            return `${days} день ${hours} часов ${minutes} минуты`;
        }
        return `${days} день ${hours} часов ${minutes} минут`;
    }
    // 2
    if (findeNum(arrMinTwo, days) === true) {
        if (hours < 1) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${days} дня ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${days} дня ${minutes} минуты`;
            }
            return `${days} дня ${minutes} минут`;
        }
        if (findeNum(arrMinOne, hours) === true) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${days} дня ${hours} час ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${days} дня ${hours} час ${minutes} минуты`;
            }
            return `${days} дня ${hours} час ${minutes} минут`;
        }
        if (findeNum(arrMinTwo, hours) === true) {
            if (findeNum(arrMinOne, minutes) === true) {
                return `${days} дня ${hours} часа ${minutes} минуту`;
            }
            if (findeNum(arrMinTwo, minutes) === true) {
                return `${days} дня ${hours} часа ${minutes} минуты`;
            }
            return `${days} дня ${hours} часа ${minutes} минут`;
        }
        if (findeNum(arrMinOne, minutes) === true) {
            return `${days} дня ${hours} часов ${minutes} минуту`;
        }
        if (findeNum(arrMinTwo, minutes) === true) {
            return `${days} дня ${hours} часов ${minutes} минуты`;
        }
        return `${days} дня ${hours} часов ${minutes} минут`;
    }
    if (hours < 1) {
        if (findeNum(arrMinOne, minutes) === true) {
            return `${days} дней ${minutes} минуту`;
        }
        if (findeNum(arrMinTwo, minutes) === true) {
            return `${days} дней ${minutes} минуты`;
        }
        return `${days} дней ${minutes} минут`;
    }
    if (findeNum(arrMinOne, hours) === true) {
        if (findeNum(arrMinOne, minutes) === true) {
            return `${days} дней ${hours} час ${minutes} минуту`;
        }
        if (findeNum(arrMinTwo, minutes) === true) {
            return `${days} дней ${hours} час ${minutes} минуты`;
        }
        return `${days} дней ${hours} час ${minutes} минут`;
    }
    if (findeNum(arrMinTwo, hours) === true) {
        if (findeNum(arrMinOne, minutes) === true) {
            return `${days} дней ${hours} часа ${minutes} минуту`;
        }
        if (findeNum(arrMinTwo, minutes) === true) {
            return `${days} дней ${hours} часа ${minutes} минуты`;
        }
        return `${days} дней ${hours} часа ${minutes} минут`;
    }
    if (findeNum(arrMinOne, minutes) === true) {
        return `${days} дней ${hours} часов ${minutes} минуту`;
    }
    if (findeNum(arrMinTwo, minutes) === true) {
        return `${days} дней ${hours} часов ${minutes} минуты`;
    }
    return `${days} дней ${hours} часов ${minutes} минут`;
}
