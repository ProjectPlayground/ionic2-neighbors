import {Injectable} from "@angular/core";

@Injectable()
export class NeighborsService {

    constructor() {
    }

    getAllNeighbors() {
        return [
            {
                "id": 1,
                "firstName": "James",
                "lastName": "King",
                "auto": "КС 1737 ВР",
                "flatNumber": "12",
                "img": "build/img/avatar.png"
            },
            {
                "id": 2,
                "firstName": "Julie",
                "lastName": "Taylor",
                "auto": "АВ 1737 АВ",
                "flatNumber": "13",
                "img": "build/img/avatar.png"
            },
            {
                "id": 3,
                "firstName": "Eugene",
                "lastName": "Lee",
                "auto": "АА 1737 АА",
                "flatNumber": "14",
                "img": "build/img/avatar.png"
            },
            {
                "id": 4,
                "firstName": "John",
                "lastName": "Williams",
                "auto": "КС 1737 АН",
                "flatNumber": "15",
                "img": "build/img/avatar.png"
            },
            {
                "id": 5,
                "firstName": "Ray",
                "lastName": "Moore",
                "auto": "АВ 1765 АЕ",
                "flatNumber": "21",
                "img": "build/img/avatar.png"
            },
            {
                "id": 6,
                "firstName": "Paul",
                "lastName": "Jones",
                "auto": "АА 1347 АЕ",
                "flatNumber": "22",
                "img": "build/img/avatar.png"
            },
            {
                "id": 7,
                "firstName": "Paula",
                "lastName": "Gates",
                "auto": "КС 4537 АН",
                "flatNumber": "23",
                "img": "build/img/avatar.png"
            },
            {
                "id": 8,
                "firstName": "Lisa",
                "lastName": "Wong",
                "auto": "АВ 1789 АА",
                "flatNumber": "24",
                "img": "build/img/avatar.png"
            },
            {
                "id": 9,
                "firstName": "Gary",
                "lastName": "Donovan",
                "auto": "АВ 3437 АА",
                "flatNumber": "25",
                "img": "build/img/avatar.png"
            },
            {
                "id": 10,
                "firstName": "Kathleen",
                "lastName": "Byrne",
                "auto": "КС 1737 ВР",
                "flatNumber": "31",
                "img": "build/img/avatar.png"
            },
        ];
    }

    getNeighbor(id:any) {
        console.log("getNeighbor id: " + id);
        var neighbor = {
            "id": 1,
            "firstName": "James",
            "lastName": "King",
            "auto": "КС 1737 ВР",
            "flatNumber": "12",
            "img": "build/img/avatar.png"
        };
        return neighbor;
    }

}
