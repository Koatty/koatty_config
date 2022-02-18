/*
 * @Description: 
 * @Usage: 
 * @Author: richen
 * @Date: 2022-02-18 10:57:24
 * @LastEditTime: 2022-02-18 11:18:46
 */
/*
 * @Author: richen
 * @Date: 2020-12-18 10:37:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-15 13:49:31
 * @License: BSD (3-Clause)
 * @Copyright (c) - <richenlin(at)gmail.com>
 */
import { IOCContainer } from "koatty_container";

/**
 * Indicates that an decorated configuration as a property.
 *
 * @export
 * @param {string} identifier configuration key
 * @param {string} [type] configuration type
 * @returns {PropertyDecorator}
 */
export function Value(key?: string, type?: string): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        // identifier = identifier || helper.camelCase(propertyKey, { pascalCase: true });
        key = key || propertyKey;
        type = type || "config";
        // IOCContainer.savePropertyData(TAGGED_ARGS, `${key ?? ""}|${type || "config"}`, target, propertyKey);
        const app = IOCContainer.getApp();
        if (!app || !app.config) {
            return;
        }
        Reflect.defineProperty(target.prototype, propertyKey, {
            enumerable: true,
            configurable: false,
            writable: true,
            value: app.config(key, type)
        });
    };
}
/**
 * Indicates that an decorated configuration as a property.
 *
 * @export
 * @param {string} identifier configuration key
 * @param {string} [type] configuration type
 * @returns {PropertyDecorator}
 */
export const Config = Value;
