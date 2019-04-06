"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var lodash_1 = require("lodash");
var UserSchema_1 = __importDefault(require("./models/UserSchema"));
var StorySchema_1 = __importDefault(require("./models/StorySchema"));
var books = [
    {
        id: 1,
        title: 'Harry Potter and the Chamber of Secrets',
        author: {
            id: 1,
            name: 'J.K. Rowling'
        }
    },
    {
        id: 2,
        title: 'Jurassic Park',
        author: {
            id: 2,
            name: 'Michael Crichton'
        },
    },
];
var resolver = {
    Query: {
        user: function (_, args) {
            return {
                id: "\uD83D\uDC4B Hello world! \uD83D\uDC4B",
                userName: "prabeen\uD83D\uDC4B",
                email: 'example@example.com'
            };
        },
        author: function (_, args) {
            return {
                id: "\uD83D\uDC4B Hello world! \uD83D\uDC4B",
                name: "prabeen\uD83D\uDC4B"
            };
        },
        books: function (_, args) {
            return books;
        },
        getBookById: function (_, args) {
            console.log(args);
            return books.filter(function (book) { return book.id === args.id; })[0];
        },
        stories: function (_, args) {
            return __awaiter(this, void 0, void 0, function () {
                var stories;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, StorySchema_1.default.find()];
                        case 1:
                            stories = _a.sent();
                            console.log('+_+_+', stories);
                            return [2, books];
                    }
                });
            });
        },
        getStoryById: function (_, args) {
            return __awaiter(this, void 0, void 0, function () {
                var story;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, StorySchema_1.default.findOne({ _id: args._id })];
                        case 1:
                            story = _a.sent();
                            console.log('+_+_+', story);
                            return [2, story];
                    }
                });
            });
        },
    },
    Mutation: {
        addUser: function (_, args) {
            return __awaiter(this, void 0, void 0, function () {
                var userName, email, password, hashedPassword, newUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userName = args.userName, email = args.email, password = args.password;
                            return [4, bcryptjs_1.default.hash(password, 10)];
                        case 1:
                            hashedPassword = _a.sent();
                            return [4, UserSchema_1.default.create({ userName: userName, email: email, password: hashedPassword })];
                        case 2:
                            newUser = _a.sent();
                            return [2, lodash_1.omit(newUser.toObject(), 'password')];
                    }
                });
            });
        },
        addStory: function (_, args) {
            return __awaiter(this, void 0, void 0, function () {
                var title, article, authorId, createdAt, newStory;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            title = args.title, article = args.article, authorId = args.authorId, createdAt = args.createdAt;
                            return [4, StorySchema_1.default.create({ title: title, article: article, authorId: authorId, createdAt: createdAt })];
                        case 1:
                            newStory = _a.sent();
                            console.log(newStory);
                            return [2, newStory.toObject()];
                    }
                });
            });
        },
        addBook: function (_, args) {
            return __awaiter(this, void 0, void 0, function () {
                var newBook;
                return __generator(this, function (_a) {
                    newBook = {
                        title: args.title,
                        id: books.length + 1,
                        author: {
                            id: 1,
                            name: 'J.K. Rowling'
                        }
                    };
                    books.push(newBook);
                    return [2, newBook];
                });
            });
        },
    },
};
exports.default = resolver;
