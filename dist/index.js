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
        while (_) try {
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
function formatKey(key, isSameRequest) {
    if (isSameRequest) {
        return key;
    }
    if (!key) {
        return 'symbol-null';
    }
    if (Array.isArray(key)) {
        return key.toString();
    }
    if (typeof key === 'object') {
        return JSON.stringify(key);
    }
    return key;
}
function DebounceRequest(fn, interval, isSameRequest) {
    if (interval === void 0) { interval = 1000; }
    if (isSameRequest === void 0) { isSameRequest = false; }
    var curTime;
    var preTime;
    var res = new Map();
    return function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var updateRequest, getRes;
            return __generator(this, function (_a) {
                updateRequest = function (key) {
                    key = formatKey(key, isSameRequest);
                    res.set(key, fn(body));
                };
                getRes = function (key) {
                    key = formatKey(key, isSameRequest);
                    if (res.has(key)) {
                        return res.get(key);
                    }
                    updateRequest(key);
                    return getRes(key);
                };
                if (!curTime) {
                    curTime = new Date().getTime();
                    preTime = new Date().getTime();
                    updateRequest(body);
                    return [2 /*return*/, getRes(body)];
                }
                curTime = new Date().getTime();
                if (curTime - preTime < interval) {
                    preTime = curTime;
                    return [2 /*return*/, getRes(body)];
                }
                preTime = curTime;
                updateRequest(body);
                return [2 /*return*/, getRes(body)];
            });
        });
    };
}
module.exports = {
    DebounceRequest: DebounceRequest
};
/** test-case */
// type RequestType<T> = (res: T) => Promise<T>
// const mockRequest:RequestType<string> = (res) => new Promise((resolve) => {
//     console.log('发了请求')
//     setTimeout(() => {
//         resolve(res)
//     }, 200);
// })
// const request = DebounceRequest(mockRequest,1000,false)
// async function exec() {
//     // const a = await request('a')
//     // const b = await request('b')
//     // const c = await request('c')
//     // const d = await request('c')
//     // const a = await request({name: 'andy'})
//     // const b = await request({name: 'andy'})
//     // const c = await request({name: 'andy'})
//     // const d = await request({name: 'andy'})
//     // console.log(a,b,c,d)
//     request({name: 'andy'}).then(res => console.log(res))
//     request({name: 'andy'}).then(res => console.log(res))
//     request({name: 'andy'}).then(res => console.log(res))
//     setTimeout(() => {
//         request({name: 'andy'}).then(res => console.log(res))
//     }, 100);
// }
// exec()
//# sourceMappingURL=index.js.map