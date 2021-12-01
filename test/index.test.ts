/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-01 17:22:13
 * @LastEditTime: 2021-12-01 18:33:07
 */
import { LoadConfigs } from "../src/index";

describe("Load", () => {
    test("LoadDir", async function () {
        process.env.NODE_ENV = "development";
        process.env.fffffff = "999";
        const res = await LoadConfigs(["./test"], "", undefined, ["*.test.ts", "test.ts"])
        expect(res.config).not.toBeNull();
        expect(res.config.ff).toEqual("999");
        console.log(res);
    });
});