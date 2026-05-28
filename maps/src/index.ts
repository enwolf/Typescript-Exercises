/// <reference types="@types/google.maps" />
import { User } from "./User";
import { Company } from "./Company";

/*
const user = new User();
console.log(user);

const company = new Company();
console.log(company);*/

import { CustomeMap } from "./CustomeMap";

const user = new User();
const company = new Company();
const customMap = new CustomeMap("map");

customMap.addMarker(user);
customMap.addMarker(company);

//customMap.addUserMarker(user);
//customMap.addCompanyMarker(company);


"AIzaSyDeKJ9pWkXF5wVTfKCkL_8SmomMqd_2fMs -use me custom map API Key!"