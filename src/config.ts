/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2022-02-18 11:19:55
 * @LastEditTime: 2024-10-30 10:59:13
 */
import * as Helper from "koatty_lib";
import { Load } from "koatty_loader";
const rc = require("rc");
/**
 * LoadConfigs
 *
 * @export
 * @param {string[]} loadPath
 * @param {string} [baseDir]
 * @param {string[]} [pattern]
 * @param {string[]} [ignore]
 * @returns {*}  
 */
export function LoadConfigs(loadPath: string[], baseDir?: string, pattern?: string[], ignore?: string[]) {
    const conf: any = {};
    const env = process.env.KOATTY_ENV || process.env.NODE_ENV || "";
    Load(loadPath, baseDir, function (name: string, path: string, exp: any) {
        let tempConf: any = {};
        if (name.indexOf("_") > -1) {
            const t = name.slice(name.lastIndexOf("_") + 1);
            if (t && env.indexOf(t) === 0) {
                name = name.replace(`_${t}`, "");
                tempConf = rc(name, { [name]: parseEnv(exp) });
            }
        } else {
            tempConf = rc(name, { [name]: parseEnv(exp) });
        }
        conf[name] = tempConf[name];
    }, pattern, ignore);

    return conf;
}

/**
 * parse process.env to replace ${}
 *
 * @param {*} conf
 * @returns {*}  
 */
function parseEnv(conf: any) {
    if (!Helper.isObject(conf)) {
        return conf;
    }
    for (const key in conf) {
        if (Object.prototype.hasOwnProperty.call(conf, key)) {
            const element = conf[key];
            if (Helper.isObject(element)) {
                conf[key] = parseEnv(element);
            } else {
                if (Helper.isString(element)) {
                    if (element.startsWith("${") && element.endsWith("}")) {
                        const value = process.env[element.slice(2, -1)];
                        if (!Helper.isTrueEmpty(value)) {
                            conf[key] = value;
                        } else {
                            conf[key] = "";
                        }
                    }
                }
            }
        }
    }
    return conf;
}