"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var todoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    userId: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Todo', todoSchema);
