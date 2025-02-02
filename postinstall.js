"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var assert = __importStar(require("assert"));
var path = __importStar(require("path"));
var child_process = __importStar(require("child_process"));
var fs = __importStar(require("fs"));
function removeRecursive(dir) {
    for (var _i = 0, _a = fs.readdirSync(dir); _i < _a.length; _i++) {
        var entry = _a[_i];
        var entryPath = path.join(dir, entry);
        var stats = void 0;
        try {
            stats = fs.lstatSync(entryPath);
        }
        catch (_b) {
            continue; // Guard against https://github.com/nodejs/node/issues/4760
        }
        if (stats.isDirectory())
            removeRecursive(entryPath);
        else
            fs.unlinkSync(entryPath);
    }
    fs.rmdirSync(dir);
}
var pkg = require(path.join(__dirname, './package.json'));
var pkgName = pkg.name;
var binaryEnv = pkgName.replace('-', '_').toUpperCase() + '_BINARY_PATH';
var getWasmName = function () {
    var _a;
    if ((_a = pkg === null || pkg === void 0 ? void 0 : pkg.vary) === null || _a === void 0 ? void 0 : _a.wasmName) {
        return pkg.vary.wasmName;
    }
    var wasmPkgName = "".concat(pkg.napi.package.name, "-wasm");
    return wasmPkgName;
};
var wasmName = getWasmName();
var validateBinary = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, binding, triple, wasmBinding, env, _a, version, repository, coreDir, installDir, installedBinPath, targetPath, reportText;
    var _b, _c;
    return __generator(this, function (_d) {
        try {
            name_1 = require(path.resolve(process.env.INIT_CWD, 'package.json')).name;
            if (name_1 === pkgName) {
                return [2 /*return*/];
            }
        }
        catch (_) {
            return [2 /*return*/];
        }
        try {
            binding = require('./binding');
            triple = binding.getTargetTriple();
            assert.ok(triple, 'Failed to read target triple from native binary.');
        }
        catch (error) {
            // if error is unsupported architecture, ignore to display.
            if (!((_b = error.message) === null || _b === void 0 ? void 0 : _b.includes('Unsupported architecture'))) {
                console.warn(error);
            }
            console.warn("".concat(pkgName, " was not able to resolve native bindings installation. It'll try to use wasm version as fallback instead."));
        }
        if (!!binding) {
            return [2 /*return*/];
        }
        // User choose to override the binary installation. Skip remanining validation.
        if (!!process.env[binaryEnv]) {
            console.warn("".concat(pkgName, " could not resolve native bindings installation, but found manual override config ").concat(binaryEnv, " specified. Skipping remaning validation."));
            return [2 /*return*/];
        }
        try {
            wasmBinding = require.resolve(wasmName);
        }
        catch (_) { }
        if (!!wasmBinding && (0, fs_1.existsSync)(wasmBinding)) {
            return [2 /*return*/];
        }
        env = __assign(__assign({}, process.env), { npm_config_global: undefined });
        _a = require(path.join(path.dirname(require.resolve(pkgName)), 'package.json')), version = _a.version, repository = _a.repository;
        coreDir = path.dirname(require.resolve(pkgName));
        installDir = path.join(coreDir, 'npm-install');
        try {
            fs.mkdirSync(installDir);
            fs.writeFileSync(path.join(installDir, 'package.json'), '{}');
            child_process.execSync("npm install --no-save --loglevel=error --prefer-offline --no-audit --progress=false ".concat(wasmName, "@").concat(version), { cwd: installDir, stdio: 'pipe', env: env });
            installedBinPath = path.join(installDir, 'node_modules', wasmName);
            targetPath = path.resolve(process.env.INIT_CWD, 'node_modules', wasmName);
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath, { recursive: true });
            }
            // INIT_CWD is injected via npm. If it doesn't exists, can't proceed.
            fs.renameSync(installedBinPath, targetPath);
        }
        catch (error) {
            console.error(error);
            reportText = ((_c = repository === null || repository === void 0 ? void 0 : repository.git) === null || _c === void 0 ? void 0 : _c.length)
                ? "please report at ".concat(repository.git)
                : 'please report issue.';
            console.error("Failed to install fallback ".concat(wasmName, "@").concat(version, ". ").concat(pkgName, " will not properly.\nPlease install ").concat(wasmName, " manually, or retry whole installation.\nIf there are unexpected errors, ").concat(reportText));
        }
        finally {
            try {
                removeRecursive(installDir);
            }
            catch (_) {
                // Gracefully ignore any failures. This'll make few leftover files but it shouldn't block installation.
            }
        }
        return [2 /*return*/];
    });
}); };
validateBinary().catch(function (error) {
    // for now just throw the error as-is.
    throw error;
});
