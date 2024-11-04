/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2021-12-01 17:22:13
 * @LastEditTime: 2024-11-04 18:20:30
 */
import { IOCContainer } from "koatty_container";
import { Helper } from "koatty_lib";
import { LoadConfigs } from "../src/index";
import { ConfigTest } from "./test";

const app = Object.create(null);
describe("Load", () => {
    beforeAll(async () => {
        process.env.NODE_ENV = "development";
        process.env.ff = "999";
    })
    test("LoadDir", async function () {
        const res = await LoadConfigs(["./test"], "", undefined, ["*.test.ts", "test.ts"])
        expect(res.config).not.toBeNull();
        expect(res.config.ff).toEqual("999");
        expect(res.config.aa).toEqual(4);
        console.log(res);
    });
});



describe("Config", () => {
    it("TestConfig", async () => {
        process.env.NODE_ENV = "development";
        process.env.ff = "999";
        const res = await LoadConfigs(["./test"], "", undefined, ["*.test.ts", "test.ts"])
        Helper.define(app, "_configs", res);
        IOCContainer.setApp(app);
        IOCContainer.reg("ConfigTest", ConfigTest);
        const ins = IOCContainer.get("ConfigTest");
        expect(ins.getBB()).toEqual(5);
    })
})