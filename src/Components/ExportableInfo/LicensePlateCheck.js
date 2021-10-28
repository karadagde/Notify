const arrSC = [];
//let scOutz = "";

//License_plate = License_plate.replace("-", "").toUpperCase();

arrSC[0] = /^[a-zA-Z]{2}[d]{2}[d]{2}$/; // 1 XX-99-99
arrSC[1] = /^[d]{2}[d]{2}[a-zA-Z]{2}$/; // 2 99-99-XX
arrSC[2] = /^[d]{2}[a-zA-Z]{2}[d]{2}$/; // 3 99-XX-99
arrSC[3] = /^[a-zA-Z]{2}[d]{2}[a-zA-Z]{2} $/; // 4 XX-99-XX
arrSC[4] = /^[a-zA-Z]{2}[a-zA-Z]{2}[d]{2}$/; // 5 XX- XX-99
arrSC[5] = /^[d]{2}[a-zA-Z]{2}[a-zA-Z]{2}$/; // 6 99-XX-XX
arrSC[6] = /^[d]{2}[a-zA-Z]{3}[d]{1}$/; // 7 99-XXX-9
arrSC[7] = /^[d]{1}[a-zA-Z]{3} [d]{2}$/; // 8 9-XXX-99
arrSC[8] = /^[a-zA-Z]{2}[d]{3}[a-zA-Z]{1}$ /; // 9 XX-999-X
arrSC[9] = /^[a-zA-Z]{1}[d]{3}[a-zA-Z]{2}$/; // 10 X-999 -XX
arrSC[10] = /^[a-zA-Z]{3}[d]{2}[a-zA-Z]{1}$/; // 11 XXX-99-X
arrSC[11] = /^[a-zA-Z]{1}[d]{2}[a-zA-Z]{3}$/; // 12 X-99-XXX
arrSC[12] = /^ [d]{1}[a-zA-Z]{2}[d]{3}$/; // 13 9-XX-999
arrSC[13] = /^[d]{3}[a-zA- Z]{2}[d]{1}$/; // 14 999-XX-9

//except licenseplates for diplomats
////scOutz = "^CD[ABFJNST][0-9]{1,3}$";
export const validLicensePlate = new RegExp(arrSC);
