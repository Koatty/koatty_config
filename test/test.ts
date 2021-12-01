/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-01 17:45:52
 * @LastEditTime: 2021-12-01 17:58:59
 */
import { LoadConfigs } from "../src/index";


async function test() {
    const res = await LoadConfigs(["./test"], "", undefined, ["*.test.ts", "test.ts"])
    console.log(process.env);

    console.log(JSON.stringify(res));

}

test();