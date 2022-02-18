/*
 * @Author: richen
 * @Date: 2020-12-18 10:37:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-18 15:24:19
 * @License: BSD (3-Clause)
 * @Copyright (c) - <richenlin(at)gmail.com>
 */
import { IOCContainer, TAGGED_ARGS } from "koatty_container";

/**
 * Indicates that an decorated configuration as a property.
 *
 * @export
 * @param {string} identifier configuration key
 * @param {string} [type] configuration type
 * @returns {PropertyDecorator}
 */
export function Config(key?: string, type?: string): PropertyDecorator {
    return (target: any, propertyKey: string) => {
        const app = IOCContainer.getApp();
        if (!app || !app.config) {
            return;
        }
        // identifier = identifier || helper.camelCase(propertyKey, { pascalCase: true });
        key = key || propertyKey;
        type = type || "config";
        IOCContainer.savePropertyData(TAGGED_ARGS, {
            name: propertyKey,
            method: function () {
                return app.config(key, type);
            }
        }, target, propertyKey);
    };
}
/**
 * Indicates that an decorated configuration as a property.
 *
 * @deprecated use `Config` instead
 * @param {string} identifier configuration key
 * @param {string} [type] configuration type
 * @returns {PropertyDecorator}
 */
export const Value = Config;
