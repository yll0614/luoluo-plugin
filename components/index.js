const _PATH = process.cwd().replace(/\\/g, "/");
const Plugin_Name = "luoluo-plugin";
const PluginPath = `${_PATH}/plugins/${Plugin_Name}`;
import Version from "./Version.js";
import Data from "./Data.js";
import render from "./renderer.js";
export { render, Data, Version, _PATH, Plugin_Name, PluginPath };
